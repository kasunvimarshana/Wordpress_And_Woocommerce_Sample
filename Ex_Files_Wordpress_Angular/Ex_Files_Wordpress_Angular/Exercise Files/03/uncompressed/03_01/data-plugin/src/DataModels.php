<?php

namespace DataPlugin;


class DataModels {
	public function register(){
		return $this->message_model();
	}
	private function message_model(){
		return [
			'link_clicks' => [
				'name'   => 'clicks',
				'access' => null,
				'params'  => [
					'url' => [ 'type' => 'string', 'required' => true ],
					'post' => [ 'type' => 'integer', 'required' => true ]
				],
				'callback' => [
					'read_item' => [ $this, 'get_link_clicks' ]
				]
			]
		];
	}

	public function get_link_clicks( $request ) {
		global $wpdb;
		$table = $wpdb->prefix . 'data_clicks';

		$request->table = $table;
		$request->post = $request->params->id;
		$request->results = $wpdb->get_results( "SELECT `url` as 'URL', COUNT('url') as 'Total' FROM $table WHERE `post` = $request->post GROUP BY `url` ORDER BY COUNT('url')" );

		return $request;

	}
}