<?php

$comment_number = 1;

_n( 'There is %d comment', 'There are %d comments', $comment_number, 'my-text-domain' );

$string = sprint( _n( 'There is %d comment', 'There are %d comments', $comment_number, 'my-text-domain' ), $comment_number );

