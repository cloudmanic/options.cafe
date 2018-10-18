<?php

//
// Date: 2018-10-18
// Author: Spicer Matthews (spicer@cloudmanic.com)
// Last Modified by: Spicer Matthews
// Last Modified: 2018-10-18
// Copyright: 2017 Cloudmanic Labs, LLC. All rights reserved.
//

namespace modules\CloudmanicCraftBrokerFinder;

use Craft;
use modules\CloudmanicCraftBrokerFinder\twigextensions\BrokerFinderTwigExtension;

class Module extends \yii\base\Module
{
  // 
  // Init.
  //
  public function init()
  {
    parent::init();

    // Add in our Twig extensions
    Craft::$app->view->registerTwigExtension(new BrokerFinderTwigExtension());      
  }
}

/* End File */