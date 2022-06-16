<?php
  require_once('database.php');

  // Database connexion.
  $db = dbConnect();
  if (!$db)
  {
    header ('HTTP/1.1 503 Service Unavailable');
    exit;
  }

  // Check the request.
  $requestMethod = $_SERVER['REQUEST_METHOD'];
  $request = substr($_SERVER['PATH_INFO'], 1);
  $request = explode('/', $request);
  $requestRessource = array_shift($request);
  
  // Check the id associated to the request.
  $id = array_shift($request);
  if ($id == '')
    $id = NULL;
  $data = false;

  // Tweets request.
  if ($requestRessource == 'tweets')
  {
    if (isset($_GET['login']))
      $data = dbRequestTweets($db, $_GET['login']);
    else
      $data = dbRequestTweets($db);
  }
  else{
      header('HTTP/1.1 400 Bad Request');
  }


  if($requestMethod == 'POST'){

    $data = NULL;
    dbAddTweet($db, $_POST['login'], strip_tags($_POST['text']));

  }

  if($requestMethod == 'PUT'){

    parse_str(file_get_contents('php://input'), $_PUT);

    $data = NULL;
    dbModifyTweet($db,$id, $_PUT['login'], strip_tags($_PUT['text']));
  }

  if($requestMethod == 'DELETE'){
    $data = NULL;
    dbDeleteTweet($db,$id, $_GET['login']);
  }


  // Send data to the client.
  header('Content-Type: application/json; charset=utf-8');
  header('Cache-control: no-store, no-cache, must-revalidate');
  header('Pragma: no-cache');
  header('HTTP/1.1 200 OK');
  echo json_encode($data);
  exit;
?>
