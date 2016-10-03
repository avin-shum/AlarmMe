/*
 * GLOBALS
 */
var displayTime = displayTime || undefined;
var chrome = chrome || undefined;


/*
 * Helper function that renders templates for app
 *
 * alarmTemplate - renders template for alarms in list on popup.js
 */
function template (template, data) {
    var html = "";


    //helper functions
    function reviseLength(txt, n) {
        if (txt.length > n) { txt = txt.substr(0, n - 3) + "..."; }
        return txt;
    }


    //TEMPLATES
    function alarmTemplate(alarm) {

        //FALLBACK from older version when alarms didn't have rep_days!
        if (!alarm.hasOwnProperty("repetitive")) {
            alarm.repetitive = false;
            alarm.rep_days = [0, 0, 0, 0, 0, 0, 0];
        }
        if (!alarm.hasOwnProperty("active")) {
            alarm.active = true;
        }


        var html = document.createElement("div");
        html.setAttribute("class", "alarm");
        html.setAttribute("key", alarm.key);

        //alarm-container
        var container = document.createElement("div");
        container.setAttribute("class", "alarm-container");
        container.setAttribute("state", alarm.active ? "active" : "inactive");


            //BODY
            var body = document.createElement("div");
            body.setAttribute("class", "alarm-body");

                var dt = displayTime(alarm.time_set);

                var body_datetime = document.createElement("div");
                body_datetime.setAttribute("class", "datetime");

                    var time = document.createElement("p");
                    time.setAttribute("class", "time");
                    time.innerHTML = dt.time;
                    var date = document.createElement("p");
                    date.setAttribute("class", "date");
                    date.innerHTML = dt.date;

                body_datetime.appendChild(time);
                body_datetime.appendChild(date);

                var body_name = document.createElement("div");
                body_name.setAttribute("class", "alarm-meta");
                    var alarm_name = document.createElement("p");
                    alarm_name.setAttribute("class", "alarm-name");
                    alarm_name.innerHTML = reviseLength(alarm.name, 22);
                body_name.appendChild(alarm_name);


                if (!alarm.repetitive) {
                    var alarm_desc = document.createElement("p");
                    alarm_desc.setAttribute("class", "alarm-desc");
                    alarm_desc.innerHTML = reviseLength(alarm.desc, 35);
                    body_name.appendChild(alarm_desc);
                } else {
                    var alarm_rep = document.createElement("p");
                    alarm_rep.setAttribute("class", "alarm-days");

                    var span,
                        days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

                    for (var i = 0; i < 7; i++) {
                        span = document.createElement("span");
                        span.innerHTML = chrome.i18n.getMessage(days[i]).charAt(0);
                        span.setAttribute("class", alarm.rep_days[i] ? "active" : "" );
                        alarm_rep.appendChild(span);
                    }
                    body_name.appendChild(alarm_rep);
                }

                body.appendChild(body_datetime);
                body.appendChild(body_name);

            container.appendChild(body);

            //OPTIONS
            var alarm_options = document.createElement("div");
                alarm_options.setAttribute("class", "alarm-options");
                alarm_options.setAttribute("state", "closed");

                var options_actions = document.createElement("div");
                options_actions.setAttribute("class", "alarm-actions");

                    // var action_remove = document.createElement("input");
                    // action_remove.setAttribute("type", "button");
                    // action_remove.setAttribute("class", "alarm-remove");
                    // options_actions.appendChild(action_remove);
                    var action_remove = document.createElement("i");
                    action_remove.setAttribute("class", "fa fa-trash fa-lg alarm-remove");
                    action_remove.setAttribute("aria-hidden", "true");
                    options_actions.appendChild(action_remove);
                    // <i class="fa fa-trash fa-lg" aria-hidden="true"></i>

                    // var action_edit = document.createElement("input");
                    // action_edit.setAttribute("type", "button");
                    // action_edit.setAttribute("class", "alarm-edit");
                    // options_actions.appendChild(action_edit);
                    var action_edit = document.createElement("i");
                    action_edit.setAttribute("class", "fa fa-pencil-square-o fa-lg alarm-edit");
                    action_edit.setAttribute("aria-hidden", "true");
                    options_actions.appendChild(action_edit);

                    // var action_state = document.createElement("input");
                    // action_state.setAttribute("type", "button");
                    // action_state.setAttribute("class", "alarm-change-state");
                    // options_actions.appendChild(action_state);
                    var action_state = document.createElement("i");
                    action_state.setAttribute("class", "fa fa-toggle-on fa-lg alarm-change-state");
                    action_state.setAttribute("aria-hidden", "true");
                    options_actions.appendChild(action_state);


                var alarm_action;
                    if (alarm.ringing) {
                        alarm_action = document.createElement("input");
                        alarm_action.setAttribute("class", "alarm-ring-cancel");
                        alarm_action.setAttribute("type", "button");
                        container.appendChild(alarm_action);
                    } else {
                        alarm_options.appendChild(options_actions); //buttons for options from above
                        alarm_action = document.createElement("i");
                        alarm_action.setAttribute("class", "fa fa-cog alarm-options-toggle");
                        alarm_action.setAttribute("aria-hidden", "true");
                        alarm_options.appendChild(alarm_action); //adding action menu into alarm

                        container.appendChild(alarm_options);
                    }

        html.appendChild(container);


        return html;
    }

    //FORKING
    if (template === 'alarm') { html = alarmTemplate(data.alarm); }

    return html;
}
template(true, {});