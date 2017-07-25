<?php

namespace cloudmanic\sitemap\controllers;

use Craft;
use craft\elements\Entry;
use craft\web\Controller;
use yii\web\Response;

class MapController extends Controller
{
  protected $allowAnonymous = ['index'];

  //
  // Print out sitemap 
  // /actions/sitemap/map
  //
  public function actionIndex()
  {
		$xml = new \SimpleXMLElement(
			'<?xml version="1.0" encoding="UTF-8"?>' .
			'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"/>'
		);

    $entries = Entry::find()->all();
    
    foreach($entries AS $key => $row)
    {
      if($row['url'])
      {
        $url = $xml->addChild('url');
        $url->addChild('loc', $row['url']);
        $url->addChild('lastmod', $row['dateUpdated']->format(\DateTime::W3C));
        $url->addChild('priority', $row['uri'] == '__home__' ? 0.75 : 0.5);        
      }
    }
		
		// XML response
    $response = Craft::$app->getResponse();
    $response->data = $xml->asXML();
    $response->getHeaders()->set('Content-Type', 'application/xml; charset=UTF-8');
    $response->format = Response::FORMAT_RAW;		

    return $response;
  }
}

/* End File */