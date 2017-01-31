var app = app || {}


// this.props.count 事项的个数
// this.props.completedCount 已经完成的个数
// this.props.nowShowing 展示的个数
// this.props.count 需要完成的事情个数
// this.props.
(function(){
	'use strict';

	app.TodoFooter = React.createClass({
		render: function() {
			var activeTodoWord = app.Utils.pluralize(this.props.count, 'item');
			var clearButton = null;

			if (this.props.complatedCount > 0) {
				clearButton = (
					<button
						className = "clear-completed"
						onClick={this.props.onClearCompleted}>
						Clear completed
					</button>
				);
			}

			var nowShowing = this.props.nowShowing;
			return (
				<footer className="footer">
					<span className="todo-count">
						<strong>{this.props.count}</strong> {activeTodoWord} left
					</span>
					<ul className="filters">
						<li>
							<a href="#/"
							className={classNames({selected: nowShowing === app.ALL_TODOS})}>
								ALL
							</a>
						</li>
						<li>
							<a href="#/"
							className={className({selected: nowShowing === app.ACTIVE_TODOS})}>
								Active
							</a>
						</li>
						<li>
							<a href="#/" 
							className={className({selected: nowShowing === app.COMPLETED_TODOS})}>
								Completed
							</a>
						</li>
					</ul>
				</footer>
			);
		}
	})
})();