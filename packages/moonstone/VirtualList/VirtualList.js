/**
 * Exports the {@link module:@enact/moonstone/VirtualList~VirtualList} and
 * {@link module:@enact/moonstone/VirtualList~VirtualGridList} components. The default export is
 * {@link module:@enact/moonstone/VirtualList~VirtualList}.
 *
 * @module @enact/moonstone/VirtualList
 */

import kind from '@enact/core/kind';
import React, {PropTypes} from 'react';

import VirtualListBase from './VirtualListBase';

/**
 * {@link module:@enact/moonstone/VirtualList~VirtualList} is a VirtualList with Moonstone styling.
 *
 * @class VirtualList
 * @ui
 * @public
 */
const VirtualList = kind({
	name: 'VirtualList',

	propTypes: {
		/**
		 * Size of an item data for the VirtualList; valid value is a number.
		 *
		 * @type {Number}
		 * @public
		 */
		dataSize: PropTypes.number.isRequired,

		/**
		 * Size of an item for the VirtualList; valid value is a number.
		 * If the direction for the list is vertical, itemSize means the height of an item.
		 * For horizontal, it means the width of an item.
		 *
		 * Usage:
		 * ```
		 * <VirtualList itemSize={ri.scale(72)}/>
		 * ```
		 *
		 * @type {Number}
		 * @public
		 */
		itemSize: PropTypes.number.isRequired
	},

	render: (props) => <VirtualListBase {...props} />
});

/**
 * {@link module:@enact/moonstone/VirtualList~VirtualGridList} is a VirtualGridList with Moonstone styling.
 *
 * @class VirtualGridList
 * @ui
 * @public
 */
const VirtualGridList = kind({
	name: 'VirtualGridList',

	propTypes: {
		/**
		 * Size of an item data for the VirtualGridList; valid value is a number.
		 *
		 * @type {Number}
		 * @public
		 */
		dataSize: PropTypes.number.isRequired,

		/**
		 * Size of an item for the VirtualGridList; valid value is an object that has `minWidth`
		 * and `minHeight` as properties.
		 *
		 * Usage:
		 * ```
		 * <VirtualGridList itemSize={{minWidth: ri.scale(180), minHeight: ri.scale(270)}}/>
		 * ```
		 *
		 * @type {Object}
		 * @public
		 */
		itemSize: PropTypes.object.isRequired
	},

	render: (props) => <VirtualListBase {...props} />
});

/**
 * {@link module:@enact/moonstone/VirtualList~VirtualVariableGridList} is a VirtualList with Moonstone styling
 * for an EGP app.
 *
 * @class VirtualVariableGridList
 * @ui
 * @public
 */
const VirtualVariableGridList = kind({
	name: 'VirtualVariableGridList',

	propTypes: {
		/**
		 * Size of an item data for the VirtualVariableGridList; valid value is an object
		 * that has `fixed` for the fixed number of row or columne and `variable` for
		 * the number of the variable number of row or columne.
		 *
		 * @type {Object}
		 * @public
		 */
		dataSize: PropTypes.object.isRequired,

		/**
		 * Size of an item for the VirtualVariableGridList; valid value is an object
		 * that has `fixed` for the fixed item size and `variable` for an variable item size.
		 *
		 * @type {Object}
		 * @public
		 */
		itemSize: PropTypes.object.isRequired
	},

	render: (props) => <VirtualListBase {...props} />
});

export default VirtualList;
export {VirtualList, VirtualGridList, VirtualVariableGridList};
export * from './GridListImageItem';
