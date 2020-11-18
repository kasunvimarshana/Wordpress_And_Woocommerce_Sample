<?php

$arg1 = 'this';
$arg2 = 'that';

// Bad
$str = __( 'I present you with', 'my-text-domain' ) . $arg1 . __( 'and', 'my-text-domain' ) . $arg2;

// Good
$str = sprintf( __( 'I present you with %1$s and %2$s', 'my-text-domain' ), $arg1, $arg2 );