<?php

//
// Date: 2018-10-18
// Author: Spicer Matthews (spicer@cloudmanic.com)
// Last Modified by: Spicer Matthews
// Last Modified: 2018-11-21
// Copyright: 2017 Cloudmanic Labs, LLC. All rights reserved.
//

namespace modules\OptionsCafe\controllers;

use Craft;
use craft\web\Controller;
use yii\web\Response;

class SignupController extends Controller
{
  protected $allowAnonymous = ['index'];

  //
  // Sign up from the marketing site for options cafe
  // /actions/options-cafe/signup
  //
  public function actionIndex()
  {
    $email = Craft::$app->request->getBodyParam('email');
    $name = Craft::$app->request->getBodyParam('name');

    // Honeypot trap
    if(strlen($name) > 0)
    {
      return $this->redirect('');
    }

    // Validate email
    if(filter_var($email, FILTER_VALIDATE_EMAIL)) 
    {
      // Subscribe (boolean set this to "true" so that you'll get a plain text response)
      $postdata = http_build_query([ 
        'email' => $email, 
        'list' => getenv("SENDY_LIST_ID"), 
        'boolean' => 'true', 
        'ipaddress' => Craft::$app->request->userIP,
        'referrer' => 'https://options.cafe',
        'Signup' => 'Yes'
      ]);

      $opts = [ 'http' => [ 'method'  => 'POST', 'header'  => 'Content-type: application/x-www-form-urlencoded', 'content' => $postdata ]];
      $context  = stream_context_create($opts);
      $result = file_get_contents(getenv("SENDY_URL") . '/subscribe', false, $context);

      // Send slack notification
      $slack = "payload=" . json_encode([
                      "channel" =>  "#events",
                      "text" => "New Website Signup From https://options.cafe : $email",
              ]);

      // You can get your webhook endpoint from your Slack settings
      $ch = curl_init(getenv("SLACK_HOOK"));
      curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
      curl_setopt($ch, CURLOPT_POSTFIELDS, $slack);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      $result = curl_exec($ch);
      curl_close($ch);  
    }

    return $this->redirect(getenv("APP_URL") . '/register?email=' . $email);
  }
}