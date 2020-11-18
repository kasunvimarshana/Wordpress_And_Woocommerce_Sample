# WordPress Angular Theme for Lynda Course

# Step 1 - Setup your new theme
* Start in terminal in your `wp-content/themes` directory
* Run `ng new angular-theme --routing=true --style=scss` to create a new angular project within directory `angular-theme`
* Open your favorite IDE or text editor to the new theme directory (themes/angular-theme)
* Create a new file, `style.css`

```
/*
 Theme Name:   Angular Theme
 Description:  Our Angular Theme
 Template:     twentyseventeen
 Version:      1.0.0
 License:      GNU General Public License v2 or later
 License URI:  http://www.gnu.org/licenses/gpl-2.0.html
 Text Domain:  angular-theme
*/
```

* Create a `functions.php` file so we can enqueue the parent theme (twentyseventeen) styles
```
add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_styles' );
function my_theme_enqueue_styles() {
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );

}
```
* You are now ready for __Step 2__
  
# Step 2 - Environment base enqueue of scripts
__Goal__: To enqueue all necessary script files for the angular app 
* First we need to create an `WP_ENV` or environment to work from. There are many ways to do this, I'm taking a simple approach
* At the bottom of your site's `wp-config.php` add `define( 'WP_ENV', 'LOCAL' );`
* Now go back to the `functions.php` file and rename `my_theme_enqueue_styles` to `angular_theme_styles_and_scripts`  
_note you will need need to change the add_action callback as well_ 
* There are 2 places your scripts might live, either in the `/dist` directory when built, or if you are running locally for development in `http://localhost:4200` by default
* We will need to check if `WP_ENV` exists and it's value
```
$script_loc = get_template_directory_uri() . '/dist/';
if ( defined( 'WP_ENV' ) && 'LOCAL' === WP_ENV ) {
    $script_loc = '//localhost:4200/';
}
```
* Next we will create an array of scripts we we are going to enqueue
```
 $scripts = [
    [
        'key' => 'inline-bundle',
        'script' => 'inline.bundle.js',
    ],
    [
        'key' => 'polyfills-bundle',
        'script' => 'polyfills.bundle.js',
    ],
    [
        'key' => 'styles-bundle',
        'script' => 'styles.bundle.js',
    ],
    [
        'key' => 'vendor-bundle',
        'script' => 'vendor.bundle.js',
    ],
    [
        'key' => 'main-bundle',
        'script' => 'main.bundle.js',
    ],
];
```
* We will want to enqueue each script in this array based on the `$script_loc` we already defined
* We will want to make sure that the dependency of each script is the script before, and `jquery` for the first one just to give some sense of where to enqueue all of these scripts
```
foreach ( $scripts as $key => $value ) {
    $prev_key = ( $key > 0 ) ? $scripts[$key-1]['key'] : 'jquery';
    wp_enqueue_script( $value['key'], $script_loc . $value['script'], array( $prev_key ), '1.0', true );
}
```
* Go ahead and view your local site. The scripts should 404 or error since the local is not currently running, but verify they are being enqueue'd by viewing source or seeing the console errors.
* The last peice of the puzzle is adding in a base href tag. You may see this error if your local site was running.
```
add_action( 'wp_head', 'add_base_href', 99 );
function add_base_href() {
	if ( is_front_page() ) {
		echo '<base href="/">';
	}
}
```
* This gives the Angular app a base reference for the URL structure. 
  
If you are going to run your app in a subdirectory or page of your website, you will need to change the base URL to reflect where the root of the app will be located. You will also want to add some logic here to determine what page is being loaded to avoid loading in unnecessary code.  
  
Since we are focusing on loading right on the home page, I put in a check for `is_front_page`

# Step 2.5 - Verifying it all works
* Just to confirm all is working, open up terminal again and run `ng serve` or `ng serve --ssl` this will get the ng app running by itself at `http(s):localhost:4200`
* Create a new page in the admin of your site called "App Home"
* Use the "text" mode and put in `<app-root></app-root>`
* Change the Reading Settings to makke the front page your new "App Home" page
* View your site, and it should show the app you can find at http://localhost:4200 within your theme
* If you are not seeing anything other than a blank WordPress page, check for errors in the console
* If you are running SSL you may not have set the security for `https://localhost:4200` so will you need to open a browser window and confirm that it is safe