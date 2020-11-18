<?php

wp_enqueue_script( 'my-script', 'my-script.js' );

// wp_localize_script( $handle, $name, $data );

wp_localize_script( 'my-script', 'my_vars',
	array(
		'message1' => __( 'Hello world!', 'my-text-domain' ),
		'message2' => __( 'Hello Mars!', 'my-text-domain' ),
	)
);