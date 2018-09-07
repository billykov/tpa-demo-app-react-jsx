define(['react', 'Wix'], function (React, Wix) {
    return React.createClass({
        getInitialState: () => {
            return {
                settingsUpdate: {},
                title_text: "Latest",
                showBox  : false
            }
        },
        componentDidMount: function () {
            //this.updateCompHeight(600);
            Wix.addEventListener(Wix.Events.SETTINGS_UPDATED, (data) => this.onSettingsUpdate(data));
            console.log("getInstanceId:" + Wix.Utils.getInstanceId());

            
            
/*
            var http = require('http');

            http.get('//www.kaleandkombucha.com/feed.xml', (resp) => {
              let data = '';

              resp.on('end', () => {
                console.log(JSON.parse(data).explanation);
                debugger;
              });

            }).on("error", (err) => {
              console.log("Error: " + err.message);
            }).on('end', () => {
                console.log(JSON.parse(data).explanation);
                debugger;
              });

              */




            // You can get the style params programmatically, un-comment the following snippet to see how it works:
            /*Wix.Styles.getStyleParams(function (style) {
             console.log(style);
             });*/

            // You can also get the style every time it changes, try this:
            /*Wix.addEventListener(Wix.Events.STYLE_PARAMS_CHANGE, function (style) {
             console.log(style);
             });*/
        },
        onSettingsUpdate: function (update) {
            if (update.key == "title_text") {
                this.setState({
                    title_text: update.value
                });
            }; 
                
            this.setState({
                settingsUpdate: update,
                showBox: true
            }, this.updateCompHeight);
        },
        updateCompHeight: (height) => {
            const desiredHeight = height || document.documentElement.scrollHeight;
            Wix.setHeight(desiredHeight);
        },
        navToHome: () => {
          Wix.getSiteMap(pages => {
            Wix.navigateToPage(pages[0].pageId.substring(1));
          });
        },
        stringify: (input) => {
            try {
                return JSON.stringify(input, null, 4);
            } catch (err) {
                return input;
            }
        },
        render: function () {
          const {settingsUpdate} = this.state;
            return (
                <div>
                    <div className="news-ticker"> 
                        <div className="news-type">{this.state.title_text}</div>
                        <div className="news-headline">{"The African city that China built ... at what cost?"}</div>
                        <div className="news-time">{"12:30pm"}</div>
                    </div>
                </div>

            )
        }
    });
});
