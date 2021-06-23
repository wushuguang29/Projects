<?php


return [
    'secret'      => Env::get('JWT_SECRET'),
    //Asymmetric key
    'public_key'  => Env::get('JWT_PUBLIC_KEY'),
    'private_key' => Env::get('JWT_PRIVATE_KEY'),
    'password'    => Env::get('JWT_PASSWORD'),
    //JWT time to live
    'ttl'         => Env::get('JWT_TTL', 7200),
    //Refresh time to live
    'refresh_ttl' => Env::get('JWT_REFRESH_TTL', 20160),
    //JWT hashing algorithm
    'algo'        => Env::get('JWT_ALGO', 'HS256'),

    'blacklist_storage' => tp51\jwt\provider\storage\Tp5::class,
];
