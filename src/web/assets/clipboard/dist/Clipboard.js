(function ($) {

    Craft.Clipboard = Garnish.Base.extend({

        // Properties
        // =========================================================================

        initialized: false,

        $trigger: null,
        $target: null,
        clipboard: null,

        init: function ($trigger, $target, settings) {
            this.$trigger = $trigger;
            this.$target = $target;

            this.setSettings(settings, Craft.Clipboard.defaults);

            this.clipboard = new Clipboard(this.$trigger);
            this.clipboard.on('success', $.proxy(this, 'onSuccess'));
            this.clipboard.on('error', $.proxy(this, 'onError'));

            this.initialized = true;
        },
        onSuccess: function (event) {
            this.settings.onSuccess(this, event);
            this.afterSuccess(event);
        },
        afterSuccess: function (event) {
            this.trigger('afterSuccess', {event: event});
        },
        onError: function (event) {
            this.settings.onError(this, event);
            this.afterError(event);
        },
        afterError: function (event) {
            this.trigger('afterError', {event: event});
        }
    }, {
        defaults: {
            copyText: 'Copy',
            copiedText: 'Copied',
            onSuccess: function (self, event) {
                event.trigger.textContent = self.settings.copiedText;
                window.setTimeout($.proxy(function () {
                    event.trigger.textContent = self.settings.copyText;
                }, this), 2000);
            },
            onError: function (self, event) {
                event.trigger.textContent = 'Press "Ctrl + C" to copy';
                window.setTimeout($.proxy(function () {
                    event.trigger.textContent = this.settings.copyText;
                }, this), 5000);
            },
        }
    });

})(jQuery);
