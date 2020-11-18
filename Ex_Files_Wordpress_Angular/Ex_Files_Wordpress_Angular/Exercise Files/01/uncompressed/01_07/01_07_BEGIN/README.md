# WordPress Angular Theme for Lynda Course

## Step 1 - Setup your new theme
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
  
## Step 2 - Environment base enqueue of scripts
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

# Step 3 - REST API Endpionts & Advanced Custom Fields
__Prerequisites:__ You will want to have ACF and the ACF to REST API plugins.  
  
We already have plenty of REST API endpoints to work with, for our basic example app we are not going to be adding any. 
If you want to learn how to add REST API endpoints make sure to check out Morten Rand Hendrickson's Lynda course diving further into the WordPress REST API.

## Localized Object
Before we even start looking at endpoints and what data will be using from the API, we need to make sure our Angular app can easily
  
There are a couple things we will want to have localized to the window, even if we don't use them now.
* The base REST API URL i.e `yourdomain.com/wp-json/`
* Current nonce that we can use to validate any authentication needed routes (we won't need this for viewing posts, only if we want to create or update)
  
In `functions.php` after our enqueue loop we will want to use `wp_localize_script` to localize our object titled `api_settings`.  
```
wp_localize_script( 'main-bundle', 'api_settings', array(
    'root' => esc_url_raw( rest_url() ),
    'nonce' => wp_create_nonce( 'wp_rest' )
) );
```
This will give us the `api_settings` object globally with `api_settings.root` and `api_settings.nonce`.

## Endpoints
We will be using a couple endpionts heavily in the next few steps to get our basic blog list and detail templates working
* `/wp-json/wp/v2/posts` - to get the list of our latest posts
* `/wp-json/wp/v2/posts/:id` - to get a specific post information
* 
  
We will however want to add some custom data, so for this we are going to use ACF or Advanced Custom Fields 

* In my example I have 2 extra ACF fields, one for an `extra title`, and one for an `extra image`
* In the currents tate the REST API endpoint for this post won't have any of that data
* Adding in the __ACF to REST API__ plugin and activating it adds in an ACF object to the return
* This can be done pretty easily with a filter for your API, so if you prefer to not have another plugin, make sure to look up how to modify the REST API output to do the same thing

```
"acf":{
    "extra_title": "Testing out this extra title!",
    "extra_image": {
        "ID": 12,
        ...
        "sizes": {
            "thumbnail": "https://..."
        }
    }
}
```

# Step 4 - Creating Angular Services for our application
Well written applications are as modular as possible (within reason) so that modifying or adding functionality can be done without much hassle.
Another big benefit of modular code is that it is more reusable, also know as "DRY coding". Code it once, and reuse it as needed, everywhere you need.  

## Services
Angular Services are injectable objects we can use to share information across multiple components. 
From an architectural point of view services also keep logic of getting / receicing data out of your components, which should be more focused on displaying the and consuming the data, not handling updating / getting, etc.  
We are going to create the following Services:
* __Window Service__ - This will help us get the window object and those global variables we defined
* __REST API SERVICE__ - This will be our service for getting post & page data from WordPress REST API
  
To create a service we are going to use that amazing Angular CLI  
To create a new service you would run this command from the directory you wanted to place your new service in (within `src/app`)
```
ng generate service [service name]
```
Before we create our service we will want to find a good place for it.  
We'll create a new directory under app called `services` so `/angular-theme/src/app/services`  
Open this directory in Terminal and create our first service for `window`
```
cd src/app
mkdir services
cd services
ng generate service window
```
now you'll see 2 files created in your services directory  
`window.service.spec.ts` & `window.service.ts`  
Before we dig into the service, lets go ahead and create our other service  
```
ng generate service RestAPI
```
Now that the 2 services are created we'll want to do 1 more thing, and that is register our services as providers for our app.  
Open `/angular-theme/src/app/app.module.ts`
At the top before `@NgModule` you'll want to import the services, long with another module we'll need shortly, the `HttpClientModule`
```
import { WindowService } from './services/window.service';
import { RestApiService } from './services/rest-api.service';
import { HttpClientModule } from "@angular/common/http";
```
inside our app we'll want to set our 2 services as providers
```
providers: [
  WindowService,
  RestApiService
]
```
and add the HttpClientModule as an import
```
imports: [
    BrowserModule,
    AppRoutingModule
    HttpClientModule
]
```
Now that the app can use our services, lets work on them.

## Window Service
We will start with the window service. The purpose of this service is to return our window object where our WordPress global object is stored.  
Open up `window.service.ts` in your editor. We will need to create 2 functions. 1 to return the window, and another inside our service that will call that function and return the window from it.

```
function _window() : any {
  return window;
}
```
The first function is easy enough, just return the window object. This needs to be created before we define the `@Injectable`

```
import { Injectable } from '@angular/core';

function _window() : any {
  return window;
}

@Injectable()...
```
The second function is a method of our service object `nativeWindow` and it will return `_window()`
```
@Injectable()
export class WindowService {

  constructor() { }

  get nativeWindow() : any {
    return _window();
  }

}
```
Now we can inject this service into any component and have `WindowService.nativeWindow` be our window object

## REST API Service
This service is going to be a bit more functional as it we will create methods  
`getPosts`, `getPost`, `getPages`, and `getPage`  
We could consolidate these into 2 methods and just pass the post type (post or page), but for now lets keep it separated.  
This Service will require the use of other injectables that are part of Angular including  
* `Http, Response, Headers` from `@angular/http`;
* `Observable` from `rxjs/Observable`;
* `WindowService` which we just created

Open `rest-api.service.ts` in your editor
We'll start with the import:  
```
import { WindowService } from './window.service';
import { HttpClient } from '@angular/common/http';
```
_Note: In the service we import `HttpClient` not `HttpClientModule`_ 
 
Now that we've gotten this far we need to set up some global variables for our service related to our api.  
  
We will want to define a new var to use `api_url`  
In the `constructor` we will want to define the url based on if the window is there and it can find our rest api url.
```
private api_url: any;
constructor( private win: WindowService, private http: HttpClient ) {
  // set API url if available, if not fallback to manual string
  this.api_url = ( this.win.nativeWindow.api_settings ) ? this.win.nativeWindow.api_settings.root + 'wp/v2/' : 'https://your.domain/wp-json/wp/v2/';
}
```
  
Now we can create our first Service method, `get_posts` which wil call the main posts REST API endpoint and retrieve all the latest posts
```
getPosts() {
  return this.http.get( this.api_url + 'posts' );
}
```
Now when we inject the `RestApiService` we can use `getPosts` to retrieve the latest posts. 
  
The second method we need to create is `getPost` which will take a post_id to retreieve
```
getPost( post_id ) {
  return this.http.get( this.api_url + 'posts/' + post_id );
}
```

Now we have 1 place to get both the latest posts and a single post data form the WordPress REST API without having to rewrite code every time!