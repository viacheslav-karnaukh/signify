(function(define) {
    'use strict';

    define(function() {
        return function(message, styles, duration, type) {
            var colors = {
                'success': '#009688',
                'info': '#00BCD4',
                'warning': '#FF9800',
                'danger': '#F44336',
                'primary': '#3F51B5',
                'default': '#000000'
            };
            
            var bgColor = type ? type in colors ? colors[type] : type : colors['default'];
            
            var defaultStyles = {
                position: 'fixed',
                zIndex: '9999',
                width: '100%',
                height: '50px',
                color: '#FFFFFF',
                backgroundColor: bgColor,
                right: 0,
                bottom: 0,
                textAlign: 'center',
                fontSize: '18px',
                fontWeight: 'bold',
                fontFamily: 'sans-serif',
                opacity: 1,
                display: 'table'
            };

            var signs = {
                warning: '&#9888;',
                success: '&#9989;',
                danger: '&#9940;',
                info: '&#9733;',
                primary: '&#9670;',
            };
            
            var notification = (function(node) {
                var contentNode = (function(inner) {
                    inner.innerHTML = (type in signs ? signs[type] + ' ' : '') + message;
                    applyStyles(inner, {
                        display: 'table-cell',
                        verticalAlign: 'middle'
                    });
                    return inner;
                })(document.createElement('span'));
                node.appendChild(contentNode);
                return node;
            })(document.createElement('div'));
            
            var publicAPI = {
                init: init,
                destroy: destroy,
                updateStyles: updateStyles,
                setDuration: setDuration
            };
            
            duration = duration || 3000;
            styles = styles ? assign(defaultStyles, styles) : defaultStyles;
            
            function assign(target, source) {
                return Object.keys(source).reduce(function(obj, key) {
                    return obj[key] = source[key], obj;
                }, target);
            }
            
            function updateStyles(stylesToUpdate) {
                assign(styles, stylesToUpdate);
                return this;
            }
            
            function setDuration(newDuration) {
                duration = newDuration;
                return this;
            }
            
            function hideSlowlyAndRemove(node) {
                if (Number(node.style.opacity) > 0) {
                    node.style.opacity = Number(node.style.opacity) - 0.01 + '';
                } else {
                    node.remove();
                    return;
                }
                setTimeout(function() {
                    hideSlowlyAndRemove(node);
                }, 17);
            }
            
            function applyStyles(node, styles) {
                Object.keys(styles).forEach(function(key) {
                    node.style[key] = styles[key];
                });
            }
            
            function init() {
                applyStyles(notification, styles);
                notification.addEventListener('click', destroy, false);
                document.body.appendChild(notification);
                if (duration !== 'pinned') {
                    setTimeout(function() {
                        hideSlowlyAndRemove(notification);
                    }, duration);
                }
                return this;
            }
            
            function destroy() {
                hideSlowlyAndRemove(notification);
                return this;
            }
            
            return publicAPI;
        };
    });
})(typeof define === 'function' && define.amd ? define : function(factory) {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory();
    } else {
        window.Notify = factory();
    }
});
