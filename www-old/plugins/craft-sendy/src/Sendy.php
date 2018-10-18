<?php
/**
 * Sendy plugin for Craft CMS 3.x
 *
 * A plugin to engage with Sendy.co
 *
 * @link      https://cloudmanic.com
 * @copyright Copyright (c) 2017 Spicer Matthews
 */

namespace cloudmanic\sendy;

use Craft;
use craft\base\Plugin;
use craft\services\Plugins;
use craft\events\PluginEvent;

use yii\base\Event;

//
// @author    Spicer Matthews
// @package   Sendy
// @since     1.0.0
// 
class Sendy extends Plugin
{
    /**
     * Static property that is an instance of this plugin class so that it can be accessed via
     * Sendy::$plugin
     *
     * @var Sendy
     */
    public static $plugin;

    //
    // Init
    //
    public function init()
    {
      parent::init();
      self::$plugin = $this;
      
      Craft::info(
          Craft::t(
              'craft-sendy',
              '{name} plugin loaded',
              ['name' => $this->name]
          ),
          __METHOD__
      );
    }
    
}

/* End File */