import _ from 'lodash';

export default function(eventName, props) {
    if (!_.isUndefined(window) && !_.isUndefined(window.analytics)) {
        window.analytics.track(eventName, props)
    }
}
