<?php
/*
 * Plugin Name:       iChart React Plugin
 * Plugin URI:        https://wordpress.org/plugins/wp-ichart-react-plugin/
 * Description:       wp reast api custom code here..
 * Author:            delowarhossen
 * Author URI:        https://delowarhossen.com/
 * Version:           1.1.1
 * Requires at least: 5.2
 * Requires PHP:      5.6
 * Text Domain:       aims-ichart-react
 */

 defined('ABSPATH') or die("No direct script access!");


/*****************************************************
 * Plugin default define
 *****************************************************/
if ( ! defined( 'WPWR_PATH' ) )
    define( 'WPWR_PATH', trailingslashit( plugin_dir_path(__FILE__)  ) );


if ( ! defined( 'aims_ichart_url' ) )
    define( 'aims_ichart_url', trailingslashit( plugins_url( '/',  __FILE__ ) ) );



add_action( 'admin_enqueue_scripts', 'aims_admin_enqueue_scripts' );

function aims_admin_enqueue_scripts() {
    wp_enqueue_style( 'aims-ichart-style', aims_ichart_url . 'build/index.css' );
    wp_enqueue_script( 'aims-ichart-script', aims_ichart_url . 'build/index.js', array( 'wp-element' ), '1.0.0', true );

    wp_localize_script( 'aims-ichart-script', 'appLocalizer', [
    		'apiUrl' => home_url('/wp-json'),
    		'nonce'  => wp_create_nonce('wp_rest')
    ] );
}


function aims_new_dashboard_setup() {

	wp_add_dashboard_widget(
		'new_dashboard_widget',
		'New Graph Widget',
		'aims_new_dashboard_widget_callback'
	);

}
add_action( 'wp_dashboard_setup', 'aims_new_dashboard_setup' );

function aims_new_dashboard_widget_callback() {
	echo '<div id="new-dashboard-widget"></div>';
}

add_action( 'admin_menu', 'aims_init_menu' );
function aims_init_menu() {
    add_menu_page( __( 'Chart Place', 'aims-ichart-react'), __( 'Chart Place', 'aims-ichart-react'), 'manage_options', 'aims-ichart-react', 'aims_admin_page', 'dashicons-admin-post', '2.1' );
}

function aims_admin_page() {
    require_once plugin_dir_path( __FILE__ ) . 'templates/app.php';
}


function aims_dashbord_table_init() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'chart_Table';
    $sql = "CREATE TABLE {$table_name} (
			id INT NOT NULL AUTO_INCREMENT,
			`name` VARCHAR(250),
      uv INT,
      pv INT,
      amt INT,
      dateT DATE,
			PRIMARY KEY (id)
	);";
    require_once ABSPATH . "wp-admin/includes/upgrade.php";
    dbDelta( $sql );

		$insert_query = "INSERT into ".$table_name." (name,uv,pv,amt,dateT) VALUES 
	    ('Page A',4000,2000,2400,'2023-03-01'),
	    ('Page B',2000,4000,3000,'2023-03-13'),
	    ('Page C',6000,3000,2000,'2023-02-6'),
	    ('Page D',1000,2000,5000,'2023-03-1'),
	    ('Page E',6000,1000,4000,'2023-02-16')
	    ";

		$wpdb->query($insert_query);
}

register_activation_hook( __FILE__, "aims_dashbord_table_init" );


require_once WPWR_PATH . 'classes/class-create-settings-routes.php';
