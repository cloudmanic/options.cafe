<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see craft\config\GeneralConfig
 */

return [
    // Global settings
    '*' => [
        // Site url
        'siteUrl' => getenv('SITE_URL'),

        // Control Panel trigger word
        'cpTrigger' => 'centcom',

        // Default Week Start Day (0 = Sunday, 1 = Monday...)
        'defaultWeekStartDay' => 0,

        // Enable CSRF Protection (recommended)
        'enableCsrfProtection' => false,

        // Whether generated URLs should omit "index.php"
        'omitScriptNameInUrls' => true,

        // Control Panel trigger word
        'cpTrigger' => 'centcom',

        // The secure key Craft will use for hashing and encrypting data
        'securityKey' => getenv('SECURITY_KEY'),

        // Are we in dev mode?
        'devMode' => getenv('DEV_MODE'),
    ],

    // Dev environment settings
    'dev' => [
        // Base site URL
        'siteUrl' => null,

        // Dev Mode (see https://craftcms.com/support/dev-mode)
        'devMode' => true,
    ],

    // Staging environment settings
    'staging' => [
        // Base site URL
        'siteUrl' => null,
    ],

    // Production environment settings
    'production' => [
        // Base site URL
        'siteUrl' => null,
    ],
];
