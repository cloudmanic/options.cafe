<?php
/**
 * Broker Finder plugin for Craft CMS 3.x
 *
 * An easy way to figure out the prices of all options brokers.
 *
 * @link      https://cloudmanic.com
 * @copyright Copyright (c) 2017 Spicer Matthews
 */

namespace cloudmanic\sitemap;


use Craft;
use craft\base\Plugin;
use craft\services\Plugins;
use craft\events\PluginEvent;
use craft\events\RegisterUrlRulesEvent;
use craft\web\UrlManager;

use yii\base\Event;

//
// @author    Spicer Matthews
// @package   Sitemap
// @since     1.0.0
// 
class Sitemap extends Plugin
{
    /**
     * Static property that is an instance of this plugin class so that it can be accessed via
     * Sitemap::$plugin
     *
     * @var Sitemap
     */
    public static $plugin;

    // Public Methods
    // =========================================================================

    /**
     * Set our $plugin static property to this class so that it can be accessed via
     * Sitemap::$plugin
     *
     * Called after the plugin class is instantiated; do any one-time initialization
     * here such as hooks and events.
     *
     * If you have a '/vendor/autoload.php' file, it will be loaded for you automatically;
     * you do not need to load it in your init() method.
     *
     */
    public function init()
    {
        parent::init();
        self::$plugin = $this;

        Craft::info('Sitemap plugin loaded', __METHOD__);
        
        // Site routes 
        Event::on(UrlManager::class, UrlManager::EVENT_REGISTER_SITE_URL_RULES, function(RegisterUrlRulesEvent $event) {
          $event->rules['sitemap.xml'] = 'sitemap/map';
        });        
    }

    // Protected Methods
    // =========================================================================

}
