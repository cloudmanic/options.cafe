<?php

namespace cloudmanic\sendy\controllers;

use Craft;
use craft\web\Controller;
use yii\web\Response;

class NewsletterController extends Controller
{
  protected $allowAnonymous = ['subscribe'];

  //
  // Accept an email from the website, newsletter signup 
  // /actions/sendy/newsletter/subscribe
  //
  public function actionSubscribe()
  {
    $post = json_decode(Craft::$app->request->getRawBody(), true);
    
    // Get the email
    if(! $email = $post['email'])
    {
      return $this->asJson([ 'status' => 0 ]);      
    }
    
    // Validate email
    if(! filter_var($email, FILTER_VALIDATE_EMAIL)) 
    {
      return $this->asJson([ 'status' => 0 ]);       
    }
	
    // Subscribe (boolean set this to "true" so that you'll get a plain text response)
    $postdata = http_build_query([ 'email' => $email, 'list' => getenv("SENDY_LIST_ID"), 'boolean' => 'true' ]);
    $opts = [ 'http' => [ 'method'  => 'POST', 'header'  => 'Content-type: application/x-www-form-urlencoded', 'content' => $postdata ]];
    $context  = stream_context_create($opts);
    $result = file_get_contents(getenv("SENDY_URL") . '/subscribe', false, $context);
        
    // Send slack notification
    $slack = "payload=" . json_encode([
                    "channel" =>  "#events",
                    "text" => "New Newsletter Subscriber From https://options.cafe : $email",
            ]);
    
    // You can get your webhook endpoint from your Slack settings
    $ch = curl_init(getenv("SLACK_HOOK"));
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $slack);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $result = curl_exec($ch);
    curl_close($ch);    
    
    // Return status via json
    return $this->asJson([ 'status' => 1 ]);
  }
}

/* End File */