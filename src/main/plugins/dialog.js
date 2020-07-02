const Dialog = {
    install(Vue, options) {
        // this.event = new Vue();

        Vue.component('DialogContainer', {
            props: {
                title: String,
                width: String,
                fullscreen: Boolean,
                top: String,
                'close-on-click-modal': Boolean
            },
            data() {
                return {
                    visible: false
                };
            },
            inject: ['event'],
            created() {
                this.event.$on('hide', this.hide);
            },
            mounted() {
                this.visible = true;
            },
            methods: {
                hide() {
                    if (this.visible) {
                        this.visible = false;
                    }
                }
            },
            render(h) {
                let self = this;
                let props = this.$props;
                let defaultSlot = this.$slots.default;
                let titleSlot = this.$slots.title;
                let footerSlot = this.$slots.footer;

                if (!footerSlot) {
                    footerSlot = h('div', [
                        h('ElButton', {
                            attrs: {
                                size: 'medium'
                            },
                            on: {
                                click() {
                                    let cancel = self.$listeners.cancel;
                                    if (cancel) {
                                        cancel();
                                    } else {
                                        self.event.$emit('cancel');
                                    }
                                }
                            }
                        }, [this.$t('取消')]),
                        h('ElButton', {
                            attrs: {
                                type: 'primary',
                                size: 'medium'
                            },
                            on: {
                                click() {
                                    let success = self.$listeners.success;
                                    if (success) {
                                        success();
                                    } else {
                                        self.event.$emit('success');
                                    }
                                }
                            }
                        }, [this.$t('确定')])
                    ]);
                }

                let slots = [defaultSlot, h('template', { slot: 'footer' }, [footerSlot])];
                if (titleSlot) {
                    slots.push(h('template', { slot: 'title' }, [titleSlot]));
                }

                return h('ElDialog', {
                    props: {
                        ...props,
                        top: '3vh',
                        visible: this.visible
                    },
                    on: {
                        close() {
                            // self.hide();
                            self.event.$emit('close');
                        }
                    }
                }, slots);
            }
        });

        Vue.prototype.$dialog = function (dialogContainer, props) {
            const dialogParent = document.createElement('div')
            document.body.appendChild(dialogParent)
            return new Promise((resolve, reject) => {
                new Vue({
                    i18n:Vue.prototype.i18n,
                    el: dialogParent,
                    data: {
                        event: new Vue()
                    },
                    provide() {
                        return {
                            event: this.event
                        }
                    },
                    created() {
                        this.event.$on('cancel', this.cancel);
                        this.event.$on('success', this.success);
                        this.event.$on('close', this.close);
                    },
                    methods: {
                        cancel(err) {
                            this.event.$emit('hide');
                            reject(err);
                        },
                        success(val) {
                            this.event.$emit('hide');
                            resolve(val);
                        },
                        close() {
                            this.event.$emit('hide');
                            reject();
                        }
                    },
                    render(h) {
                        return h(dialogContainer, {
                            props: props,
                            on: {
                                cancel: this.cancel,
                                success: this.success
                            }
                        });
                    },
                    destroyed() {
                        document.body.removeChild(dialogParent);
                    }
                });
            });
        };
    }
};

export default Dialog;