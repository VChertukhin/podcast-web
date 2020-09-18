import './common/_commonjsHelpers-6f5dde0d.js';
import { r as react } from './common/index-df564204.js';
import { p as propTypes } from './common/index-250039db.js';
import { I as IMask } from './common/index-f1890e0e.js';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var MASK_PROPS = {
  // common
  mask: propTypes.oneOfType([propTypes.array, propTypes.func, propTypes.string, propTypes.instanceOf(RegExp), propTypes.oneOf([Date, Number, IMask.Masked]), propTypes.instanceOf(IMask.Masked)]),
  value: propTypes.any,
  unmask: propTypes.oneOfType([propTypes.bool, propTypes.oneOf(['typed'])]),
  prepare: propTypes.func,
  validate: propTypes.func,
  commit: propTypes.func,
  overwrite: propTypes.bool,
  // events
  onAccept: propTypes.func,
  onComplete: propTypes.func,
  // pattern
  placeholderChar: propTypes.string,
  lazy: propTypes.bool,
  definitions: propTypes.object,
  blocks: propTypes.object,
  // date
  pattern: propTypes.string,
  format: propTypes.func,
  parse: propTypes.func,
  autofix: propTypes.bool,
  // number
  radix: propTypes.string,
  thousandsSeparator: propTypes.string,
  mapToRadix: propTypes.arrayOf(propTypes.string),
  scale: propTypes.number,
  signed: propTypes.bool,
  normalizeZeros: propTypes.bool,
  padFractionalZeros: propTypes.bool,
  min: propTypes.oneOfType([propTypes.number, propTypes.instanceOf(Date)]),
  max: propTypes.oneOfType([propTypes.number, propTypes.instanceOf(Date)]),
  // dynamic
  dispatch: propTypes.func,
  // ref
  inputRef: propTypes.func
};
var MASK_PROPS_NAMES = Object.keys(MASK_PROPS);
var NON_MASK_OPTIONS_PROPS_NAMES = ['value', 'unmask', 'onAccept', 'onComplete', 'inputRef'];
var MASK_OPTIONS_PROPS_NAMES = MASK_PROPS_NAMES.filter(function (pName) {
  return NON_MASK_OPTIONS_PROPS_NAMES.indexOf(pName) < 0;
});
function IMaskMixin(ComposedComponent) {
  var MaskedComponent =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(MaskedComponent, _React$Component);

    function MaskedComponent() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, MaskedComponent);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MaskedComponent)).call.apply(_getPrototypeOf2, [this].concat(args)));
      _this._inputRef = _this._inputRef.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(MaskedComponent, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        if (!this.props.mask) return;
        this.initMask();
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        var props = this.props;

        var maskOptions = this._extractMaskOptionsFromProps(props);

        if (maskOptions.mask) {
          if (this.maskRef) {
            this.maskRef.updateOptions(maskOptions);

            if ('value' in props && (props.value !== this.maskValue || // handle cases like Number('') === 0,
            // for details see https://github.com/uNmAnNeR/imaskjs/issues/134
            typeof props.value !== 'string' && this.maskRef.value === '' && !this.maskRef.el.isActive)) {
              this.maskValue = props.value;
            }
          } else {
            this.initMask(maskOptions);
            if (props.value !== this.maskValue) this._onAccept();
          }
        } else {
          this.destroyMask();
          if ('value' in props) this.element.value = props.value;
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.destroyMask();
      }
    }, {
      key: "_inputRef",
      value: function _inputRef(el) {
        this.element = el;
        if (this.props.inputRef) this.props.inputRef(el);
      }
    }, {
      key: "render",
      value: function render() {
        return react.createElement(ComposedComponent, Object.assign({}, this._extractNonMaskProps(this.props), {
          defaultValue: this.props.value,
          inputRef: this._inputRef
        }));
      }
    }, {
      key: "initMask",
      value: function initMask() {
        var maskOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._extractMaskOptionsFromProps(Object.assign({}, this.props));
        this.maskRef = IMask(this.element, maskOptions).on('accept', this._onAccept.bind(this)).on('complete', this._onComplete.bind(this));
        this.maskValue = this.props.value;
      }
    }, {
      key: "destroyMask",
      value: function destroyMask() {
        if (this.maskRef) {
          this.maskRef.destroy();
          delete this.maskRef;
        }
      }
    }, {
      key: "_extractMaskOptionsFromProps",
      value: function _extractMaskOptionsFromProps(props) {
        props = Object.assign({}, props); // keep only mask options props

        Object.keys(props).filter(function (prop) {
          return MASK_OPTIONS_PROPS_NAMES.indexOf(prop) < 0;
        }).forEach(function (nonMaskProp) {
          delete props[nonMaskProp];
        });
        return props;
      }
    }, {
      key: "_extractNonMaskProps",
      value: function _extractNonMaskProps(props) {
        props = Object.assign({}, props);
        MASK_PROPS_NAMES.forEach(function (maskProp) {
          delete props[maskProp];
        });
        return props;
      }
    }, {
      key: "_onAccept",
      value: function _onAccept() {
        var _this$props;

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        if (this.props.onAccept) (_this$props = this.props).onAccept.apply(_this$props, [this.maskValue, this.maskRef].concat(args));
      }
    }, {
      key: "_onComplete",
      value: function _onComplete() {
        var _this$props2;

        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        if (this.props.onComplete) (_this$props2 = this.props).onComplete.apply(_this$props2, [this.maskValue, this.maskRef].concat(args));
      }
    }, {
      key: "maskValue",
      get: function get() {
        if (this.props.unmask === 'typed') return this.maskRef.typedValue;
        if (this.props.unmask) return this.maskRef.unmaskedValue;
        return this.maskRef.value;
      },
      set: function set(value) {
        value = value == null ? '' : value;
        if (this.props.unmask === 'typed') this.maskRef.typedValue = value;else if (this.props.unmask) this.maskRef.unmaskedValue = value;else this.maskRef.value = value;
      }
    }]);

    return MaskedComponent;
  }(react.Component);

  MaskedComponent.propTypes = MASK_PROPS;
  var nestedComponentName = ComposedComponent.displayName || ComposedComponent.name || 'Component';
  MaskedComponent.displayName = "IMask(".concat(nestedComponentName, ")");
  return MaskedComponent;
}

var InputComponent = function InputComponent(_ref) {
  var inputRef = _ref.inputRef,
      props = _objectWithoutProperties(_ref, ["inputRef"]);

  return react.createElement('input', Object.assign({}, props, {
    ref: inputRef
  }));
};

var IMaskInput = IMaskMixin(InputComponent);

export { IMaskMixin };
//# sourceMappingURL=react-imask.js.map
