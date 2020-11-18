<?php

$greeting = 'Hello';

$greeting = __( 'Hello' );

$greeting = __( 'Hello', 'my-text-domain' );
echo $greeting;

_e( 'Hello', 'my-text-domain' );
