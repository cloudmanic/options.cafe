<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the default settings in `vendor/craftcms/cms/src/config/defaults/general.php`.
 */

return [
    // Base site URL
    'siteUrl' => getenv('SITE_URL'),

    // Default Week Start Day (0 = Sunday, 1 = Monday...)
    'defaultWeekStartDay' => 0,

    // Enable CSRF Protection (recommended, will be enabled by default in Craft 3)
    'enableCsrfProtection' => false,

    // Whether "index.php" should be visible in URLs (true, false, "auto")
    'omitScriptNameInUrls' => true,

    // Control Panel trigger word
    'cpTrigger' => 'centcom',

    // Dev Mode (see https://craftcms.com/support/dev-mode)
    'devMode' => getenv('DEV_MODE'),
    
    // No need to tell people we are using Craft.
    'sendPoweredByHeader' => false
];
