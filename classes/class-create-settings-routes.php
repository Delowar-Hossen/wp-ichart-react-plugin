<?php
/**
 * This file will create Custom Rest API End Points.
 */
class WP_React_Settings_Rest_Route {

    public function __construct() {
        add_action( 'rest_api_init', [ $this, 'create_rest_routes' ] );
    }

    public function create_rest_routes() {

        register_rest_route( 'wprk/v2', '/settings', [
            'methods'               => 'GET',
            'callback'              => [ $this, 'get_settings' ],
            'permission_callback'   => [ $this, 'get_settings_permission' ]
        ] );

        register_rest_route( 'wprk/v2', '/last-n-days/(?P<days>\d+)/', [
            'methods'               => 'GET',
            'callback'              => [ $this, 'get_last_n_days_data' ],
            'permission_callback'   => [ $this, 'get_settings_permission' ]

        ] );
        
        register_rest_route( 'wprk/v2', '/edit/(?P<id>\d+)/', [
            'methods'               => 'GET',
            'callback'              => [ $this, 'get_settings_edit_data' ],
            'permission_callback'   => [ $this, 'get_settings_permission' ]
        ] );
        
        register_rest_route( 'wprk/v2', '/insertdata', [
            'methods'               => 'POST',
            'callback'              => [ $this, 'get_settings_insertdata' ],
            'permission_callback'   => [ $this, 'get_settings_permission' ]
        ] );

        
    }

    public function get_last_n_days_data( $request ) {

        $days = $request['days'];
        return $this->get_data_for_days( $days );

    }

    public function get_data_for_days ( $days ) {
        global $wpdb;
        $table_name = $wpdb->prefix . 'chart_Table';
        if($days == 0){
            $result     = $wpdb->get_results( $wpdb->prepare("SELECT * FROM {$table_name} "),ARRAY_A );
            return $result;

        }
        $query      = "SELECT * FROM $table_name WHERE dateT >= DATE_SUB( NOW(), INTERVAL $days DAY )";
        $result     = $wpdb->get_results( $query );

        return $result;

    }

   
    public function get_settings() {
        global $wpdb;
        $table_name = $wpdb->prefix . 'chart_Table';
        $all_qu     = $wpdb->get_results( $wpdb->prepare("SELECT * FROM {$table_name} "),ARRAY_A );
        
        return $all_qu;
    }

    public function get_settings_edit_data( $request ) {

        $id = $request['id'];
       // return $this->get_data_for_days( $days );
        global $wpdb;
        $table_name = $wpdb->prefix . 'chart_Table';
        if(!empty($id ) ){
            $result     = $wpdb->get_results( $wpdb->prepare("SELECT * FROM {$table_name}  WHERE id=$id  LIMIT 1") );
            return $result[0];

        }

        return $result;

    }

    public function get_settings_insertdata( $request ) {

        global $wpdb;
        $table_name = $wpdb->prefix . 'chart_Table';

        $wpdb->insert($table_name, array(
            'name'    => $request['name'],
            'uv'    => $request['uv'],
            'pv'    => $request['pv'],
            'amt'   => $request['amt'],
            'dateT' => date( 'Y-m-d', current_time('timestamp') )
        ));

       // return $result;
        $data['message'] = 'Post Request was received.';
        return rest_ensure_response( $data );

    }

    public function get_settings_permission() {
        return true;
    }

    

    public function save_settings_permission() {
        return current_user_can( 'publish_posts' );
    }
}
new WP_React_Settings_Rest_Route();