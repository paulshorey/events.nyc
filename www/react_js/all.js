'use strict';

if (!React.html) {
	React.html = {};
}
React.html['events'] = React.createClass({
	bindClick: function bindClick(link) {
		console.log('clickLink', link);
		//window.open(link, '_system');
		return false;
	},
	handleTouchTap: function handleTouchTap(e) {
		console.log('clickLink', link);
		(function (e) {
			return e.preventDefault();
		});
		return false;
	},

	render: function render(events) {

		var rows = [];
		var old_timestring = '';
		var old_event_featured_images = [];
		var old_date = '';
		for (var i = 0; i < this.props.events.length; i++) {
			var event = this.props.events[i];
			if (!event.texts) {
				break;
			}
			var timestring = Date.create(event.timestamp).short();
			var todayEnd = moment().endOf('day').format('x');
			if (event.timestamp < todayEnd - 1) {
				// party must end before midnight, because we don't know when exactly tomorrow's dates are, most come in as 12:00am
				timestring = 'today';
			} else if (event.timestamp < todayEnd - 1 + 1000 * 60 * 60 * 24) {
				timestring = 'tomorrow';
			} else if (event.timestamp < todayEnd - 1 + 1000 * 60 * 60 * 24 * 6) {
				timestring = 'this week';
			} else if (event.timestamp < todayEnd - 1 + 1000 * 60 * 60 * 24 * 30) {
				timestring = 'this month';
			}

			// <timestring>
			if (timestring != old_timestring) {
				//var timeUnique = cutOldBeginning(old_timestamp, event.timestamp);
				rows.push(React.createElement(
					'div',
					{ className: 'events-timestamp' },
					React.createElement(
						'span',
						null,
						timestring
					)
				));
			}

			// <event>
			rows.push(React.createElement(
				'div',
				{ className: 'events-event' },
				React.createElement(
					'span',
					{ className: 'event-text' },
					React.createElement(
						'a',
						{ className: 'event-link', href: event.link, target: '_blank', onClick: this.bindClick.bind(this, event.link), onTouchTap: this.handleTouchTap },
						event.texts[0]
					),
					React.createElement(
						'span',
						null,
						event.texts[1]
					),
					React.createElement(
						'span',
						null,
						event.texts[2]
					)
				)
			));
		}

		return React.createElement(
			'div',
			{ 'class': 'my-events' },
			rows
		);
	}
});