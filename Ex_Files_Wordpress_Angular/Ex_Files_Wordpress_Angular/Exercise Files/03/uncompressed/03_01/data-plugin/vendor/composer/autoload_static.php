<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit13ada0ee75c5b507f7682bf72dc973a9
{
    public static $prefixLengthsPsr4 = array (
        'W' => 
        array (
            'WAR\\' => 4,
        ),
        'F' => 
        array (
            'Firebase\\JWT\\' => 13,
        ),
        'D' => 
        array (
            'DataPlugin\\' => 11,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'WAR\\' => 
        array (
            0 => __DIR__ . '/..' . '/skypress/war-api-plugin/src',
        ),
        'Firebase\\JWT\\' => 
        array (
            0 => __DIR__ . '/..' . '/firebase/php-jwt/src',
        ),
        'DataPlugin\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit13ada0ee75c5b507f7682bf72dc973a9::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit13ada0ee75c5b507f7682bf72dc973a9::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
