<?php

namespace cloudmanic\nginx\controllers;

use Craft;
use HttpRequest;
use craft\elements\Entry;
use craft\web\Controller;
use yii\web\Response;

class CacheController extends Controller
{
  protected $allowAnonymous = [];

  //
  // Clear Nginx Cache
  //
  public function actionClear()
  {
    exec("rm -rf /tmp/nginx/*");
    
    // Rebuild cache
    $curl = curl_init();
    
    curl_setopt_array($curl, [
      CURLOPT_URL => getenv('NGINX_CACHE_WARM_URL'),
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => "",
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 30,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => "POST",
      CURLOPT_POSTFIELDS => "{\"token\": \"". getenv('NGINX_CACHE_WARM_KEY') . "\",\"sitemap\": \"". getenv('SITE_URL') ."/sitemap.xml\"}",
      CURLOPT_HTTPHEADER => [
        "cache-control: no-cache",
        "content-type: application/json"
      ]
    ]);
    
    $response = curl_exec($curl);
    $err = curl_error($curl);
    
    curl_close($curl);
    
    if($err) 
    {
      echo "cURL Error #:" . $err;
      die();
    }   
    
    $json = json_decode($response, true);
    
    if(! $json['status'])
    {
      echo $response;
      die();
    }

    // Send notice the cache clear went well.    
    Craft::$app->getSession()->setNotice(Craft::t('redirect', 'Nginx Cache Cleared.'));
    
    return $this->redirect('centcom/craft-nginx');
  } 
}

/* End File */