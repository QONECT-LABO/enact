/**
 * Exports the {@link moonstone/MoonstoneDecorator.MoonstoneDecorator} HOC
 *
 * @module moonstone/MoonstoneDecorator
 */

import {addAll} from '@enact/core/keymap';
import hoc from '@enact/core/hoc';
import I18nDecorator from '@enact/i18n/I18nDecorator';
import React from 'react';
import ReactDOM from 'react-dom';

import {init, defineScreenTypes, getResolutionClasses} from '@enact/ui/resolution';
import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';

import Skinnable from '../Skinnable';

import I18nFontDecorator from './I18nFontDecorator';
import screenTypes from './screenTypes.json';
import css from './MoonstoneDecorator.less';
import {configure} from '@enact/ui/Touchable';
import {contextTypes} from '@enact/core/internal/PubSub';

import Accessibility from './AccessibilityUtils';

/**
 * Default config for {@link moonstone/MoonstoneDecorator.MoonstoneDecorator}.
 *
 * @memberof moonstone/MoonstoneDecorator
 * @hocconfig
 */
const defaultConfig = {
	i18n: true,
	float: true,
	noAutoFocus: false,
	overlay: false,
	ri: {
		screenTypes,
		dynamic: true
	},
	spotlight: true,
	textSize: true,
	skin: true
};

/**
 * {@link moonstone/MoonstoneDecorator.MoonstoneDecorator} is a Higher-order Component that applies
 * Moonstone theming to an application. It also applies
 * [floating layer]{@link ui/FloatingLayer.FloatingLayerDecorator},
 * [resolution independence]{@link ui/resolution.ResolutionDecorator},
 * [custom text sizing]{@link moonstone/MoonstoneDecorator.TextSizeDecorator},
 * [skin support]{@link ui/Skinnable}, [spotlight]{@link spotlight.SpotlightRootDecorator}, and
 * [internationalization support]{@link i18n/I18nDecorator.I18nDecorator}. It is meant to be applied to
 * the root element of an app.
 *
 * [Skins]{@link ui/Skinnable} provide a way to change the coloration of your app. The currently
 * supported skins for Moonstone are "moonstone" (the default, dark skin) and "moonstone-light".
 * Use the `skin` property to assign a skin. Ex: `<DecoratedApp skin="light" />`
 *
 * @class MoonstoneDecorator
 * @memberof moonstone/MoonstoneDecorator
 * @hoc
 * @public
 */
const MoonstoneDecorator = hoc(defaultConfig, (config, Wrapped) => {
	
	const {ri, i18n, float, overlay, skin, textSize, highContrast} = config;
	
	if (ri.screenTypes) {
		defineScreenTypes(ri.screenTypes);
	}
	// Apply classes depending on screen type (overlay / fullscreen)
	const bgClassName = 'enact-fit' + (overlay ? '' : ` ${css.bg}`);

	let App = Wrapped;
	if (i18n) {
		// Apply the @enact/i18n decorator around the font decorator so the latter will update the
		// font stylesheet when the locale changes
		App = I18nDecorator(
			I18nFontDecorator(
				App
			)
		);
	}
	if (float) App = FloatingLayerDecorator({wrappedClassName: bgClassName}, App);
	// if (ri) App = ResolutionDecorator(ri, App);
	if (skin) App = Skinnable({defaultSkin: 'dark'}, App);

	// add webOS-specific key maps
	addAll({
		cancel: 461,
		nonModal: [
			461,
			415, // play
			19, // pause
			403, // red
			404, // green
			405, // yellow
			406, // blue
			33, // channel up
			34 // channel down
		],
		red: 403,
		green: 404,
		yellow: 405,
		blue: 406,
		play: 415,
		pause: 19,
		rewind: 412,
		fastForward: 417,
		pointerHide: 1537,
		pointerShow: 1536
	});

	// configure the default hold time
	configure({
		hold: {
			events: [
				{name: 'hold', time: 400}
			]
		}
	});

	const Decorator = class extends React.Component {
		static displayName = 'MoonstoneDecorator';

		static contextTypes = contextTypes

		static childContextTypes = contextTypes

		static propTypes =  Accessibility.accessibilityPropTypes;

		static defaultProps = Accessibility.defaultProps

		constructor (props) {
			super(props);
			init();
			this.state = {
				resolutionClasses: ''
			};
		}

		getChildContext () {
			return {
				Subscriber: this.publisher.accessibility.getSubscriber()
			};
		}

		componentWillMount () {
			this.publisher = {};
			if (textSize || highContrast) {
				this.publisher.accessibility = Accessibility.createResizePublisher(this.context.Subscriber);
			}
		}

		componentDidMount () {
			if (ri.dynamic) window.addEventListener('resize', this.handleResize);
			// eslint-disable-next-line react/no-find-dom-node
			this.rootNode = ReactDOM.findDOMNode(this);
		}

		componentDidUpdate (prevProps) {
			Accessibility.onTextSizeChange(this.props, prevProps, this.publisher);
		}

		componentWillUnmount () {
			if (ri.dynamic) window.removeEventListener('resize', this.handleResize);
		}

		handleResize = () => {
			const classNames = this.didClassesChange();

			if (classNames) {
				this.setState({resolutionClasses: classNames});
			}
		}

		didClassesChange () {
			const prevClassNames = getResolutionClasses();
			init({measurementNode: this.rootNode});
			const classNames = getResolutionClasses();
			if (prevClassNames !== classNames) {
				return classNames;
			}
		}

		render () {
			let className = css.root + ' enact-unselectable enact-fit ';
			if (!float) {
				className += ' ' + bgClassName;
			}
			if (this.props.className) {
				className += ` ${this.props.className}`;
			}

			const {highContrast: contrast, textSize: size, ...props} = this.props;
			const combinedClassName = Accessibility.createClassName(className, contrast, size);

			let classes = getResolutionClasses();
			if (combinedClassName) classes += (classes ? ' ' : '') + combinedClassName;

			return (
				<App {...props} className={classes} />
			);
		}
	};

	return Decorator;
});

export default MoonstoneDecorator;
export {MoonstoneDecorator};
