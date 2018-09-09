import UI from 'editor-ui-lib';
import React from 'react'
import Wix from 'Wix';
import Main from './modules/main/main';
import Settings from './modules/settings/settings';
import Layout from './modules/layout/layout';
import Design from './modules/design/design';
import Animations from './modules/animations/animations';
import Support from './modules/support/support';


export default class settings extends React.Component {
    settingsUpdate (key, value) {
        const data = {key: key, value: value};
        Wix.Settings.triggerSettingsUpdatedEvent(data);
        console.log(data);
    }

    componentDidMount () {
        console.log('componentDidMount');
        Wix.addEventListener(Wix.Events.SITE_PUBLISHED, function(){
        debugger;
        });
        var config = {
                apiKey: "AIzaSyCrEcfR6yAPz2mm_EK5_dg5auPTdsuK5Lo",
                authDomain: "wix-test-billy.firebaseapp.com",
                databaseURL: "https://wix-test-billy.firebaseio.com",
                projectId: "wix-test-billy",
                storageBucket: "wix-test-billy.appspot.com",
                messagingSenderId: "118952255688"
            };
        firebase.initializeApp(config);
        var db = firebase.firestore();
        db.settings({ timestampsInSnapshots: true });

        var app_id = Wix.Utils.getInstanceId();
        db.collection('settings').doc(app_id).get()
        .then((snapshot) => {
            if (snapshot.data()) {
                console.log("snapshot: "+snapshot.data());
                //debugger;
            } else {
                /* No settings stored */
                //debugger;
            }
            
        });

    }

    onSitePublished () {
        console("yo bitch");
        debugger;
    }

    render () {
        return (
            <UI.appSettings>
                <UI.panelTabs defaultTabIndex={0} showTabNotification={0,"wow"}>
                    <Main tab="Main" />
                    <Settings tab="Settings" onUpdate={this.settingsUpdate}/>
                    <Design tab="Design" onUpdate={this.settingsUpdate} />
                    <Animations tab="Animations" onUpdate={this.settingsUpdate}/>
                    <hr className="divider-short"/>
                    <Support tab="Support"/>
                    <UI.button label="Upgrade" className="btn-upgrade-nav" onClick={() => Wix.Settings.openBillingPage()}/>
                </UI.panelTabs>
            </UI.appSettings>
        )
    }
}



