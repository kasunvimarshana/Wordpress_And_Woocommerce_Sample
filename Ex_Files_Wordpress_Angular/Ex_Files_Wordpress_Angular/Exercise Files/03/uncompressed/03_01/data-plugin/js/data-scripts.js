var data_plugin = data_plugin || {};

(function($){

    data_plugin.link_tracking = (function(app){

        app.$body = $('body');

        $(document).ready(function(){
            if ( app.$body.hasClass('single') ) {
                app.init();
            }
        });

        app.init = function() {
            app.$body.on('click', 'a', app.trackLink );
        };

        app.trackLink = function(e){
            e.preventDefault();

            var url = $(this).attr('href'),
                post_id = $('#dataPluginID').data('id');

            if( ! post_id || ! url ) { return; }

            $.ajax({
                method: 'POST',
                url: data_plugin_settings.root + 'data/v1/clicks',
                data: {
                    post: post_id,
                    url: url
                }
            }).done(function(res){
                console.log( res );
            })

        };

        return app;
    }(data_plugin.link_tracking || {}))

}(jQuery));