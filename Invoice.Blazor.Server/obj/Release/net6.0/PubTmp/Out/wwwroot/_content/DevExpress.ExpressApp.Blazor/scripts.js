(function () {
    (function () {
        const observer = new MutationObserver(function (mutationsList, observer) {
            var appElement = document.querySelector("app");
            if (appElement && appElement.innerText && appElement.innerText.trim()) {
                observer.disconnect();
                if (document.getElementById('applicationLoadingPanel')) {
                    document.getElementById('applicationLoadingPanel').remove();
                }
                appElement.classList.remove("d-none");
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }());

    (function () {
        function processGroup(element) {
            var btnGroup = element.closest('.btn-group');
            if (btnGroup) {
                btnGroup.classList.add('group-has-template');
            }
        }
        const toolbarObserver = new MutationObserver(function (mutationsList) {
            mutationsList.forEach(function (mutation) {
                for (let i = 0; i < mutation.addedNodes.length; i++) {
                    let node = mutation.addedNodes[i];
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        if (node.matches('.combobox-xaf-action, .parametrized-action-wrapper')) {
                            processGroup(node);
                        }
                        var elements = node.querySelectorAll('.combobox-xaf-action, .parametrized-action-wrapper');
                        for (let j = 0; j < elements.length; j++) {
                            processGroup(elements[j]);
                        }
                    }
                };
            });
        });
        toolbarObserver.observe(document.body, { childList: true, subtree: true });

        const toolbarGroupsObserver = new MutationObserver(function (mutationsList) {
            mutationsList.forEach(function (mutation) {
                if (mutation.oldValue && mutation.oldValue.includes("group-has-template") && !mutation.target.classList.contains("group-has-template")) {
                    mutation.target.classList.add("group-has-template");
                }
            });
        });
        toolbarGroupsObserver.observe(document.body, { attributeFilter: ["class"], attributeOldValue: true, subtree: true });
    }());

    function checkRecconect() {
        var reconnectModalElement = document.querySelector('body > #components-reconnect-modal');
        if (reconnectModalElement) {
            reconnectModalElement.classList.add("bg-dark", "text-white");
            var reloadingLink = document.querySelector('#components-reconnect-modal a');
            if (reloadingLink) {
                reloadingLink.classList.add("text-primary");
            }
            var retryButton = document.querySelector('#components-reconnect-modal button');
            if (retryButton) {
                retryButton.classList.add("btn", "btn-primary", "shadow-none");
            }
        }
    }
    const documentBodyObserver = new MutationObserver(() => {
        checkRecconect();
    }
    ).observe(document.body, { childList: true, subtree: true });

    function createEasyTest() {
        var _dataReceivedCallCount = 0,
            _currentID = '',
            dataReceiveObserver;
        return {
            start: () => {
                _currentID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });

                dataReceiveObserver = new MutationObserver(() => {
                    _dataReceivedCallCount++;
                });
                dataReceiveObserver.observe(document.body, { childList: true, subtree: true });
                return _currentID;
            },
            stop: () => {
                if (dataReceiveObserver) {
                    dataReceiveObserver.disconnect();
                    dataReceiveObserver = null;
                }
            },
            get dataReceivedCallCount() {
                return _dataReceivedCallCount;
            },
            get currentId() {
                return _currentID;
            }
        };
    }
    function getColumnChooserTargetSelector(columnChooserToolbarItemCssClass) {
        let toolbarItemSelector = '.' + columnChooserToolbarItemCssClass;
        let toolbarItem = document.querySelector(toolbarItemSelector);
        if (toolbarItem) {
            let itemIsHidden = getComputedStyle(toolbarItem).display === 'none';
            if (itemIsHidden) {
                let toolbar = toolbarItem.closest('.dxbl-toolbar');
                let ag = toolbar.querySelector('.dxbl-toolbar-btn-ellipsis');
                let ellipsisAttribute = ag.attributes['data-dxtoolbar-ellipsis-dropdown-id'];
                return '[' + ellipsisAttribute.name + '="' + ellipsisAttribute.value + '"]';
            }
        }
        return toolbarItemSelector;
    }
    function createLoadingIndicator() {
        var delayTimeout = 200,
            timer = null,
            startTime = null,
            containerEl = () => document.getElementById("xaf-loading"),
            indicatorEl = () => document.querySelector("#xaf-loading .xaf-loading-content");
        return {
            isShowing: () => {
                return containerEl().className === "xaf-loading show";
            },
            show: () => {
                startTime = null;
                containerEl().className = "xaf-loading show";
                timer = setTimeout(() => {
                    var indicator = indicatorEl();
                    if (indicator) {
                        indicator.style.visibility = "visible";
                        indicator.style.backgroundColor = getComputedStyle(document.body).backgroundColor;
                        startTime = Date.now();
                    }
                }, delayTimeout);
            },
            hide: () => {
                clearTimeout(timer);
                var spendTime = startTime && Date.now() - startTime;
                if (spendTime && spendTime > delayTimeout) {
                    indicatorEl().style.visibility = "hidden";
                    containerEl().className = "xaf-loading";
                } else {
                    setTimeout(() => {
                        indicatorEl().style.visibility = "hidden";
                        containerEl().className = "xaf-loading";
                    }, delayTimeout);
                }
            }
        };
    }
    function addChildEventListener(base, eventName, selector, handler) {
        base.addEventListener(eventName, function (event) {
            var closest = event.target.closest(selector);
            if (closest && base.contains(closest)) {
                handler.call(closest, event);
            }
        });
    }

    var rootElement = document.querySelector("body");
    addChildEventListener(rootElement, "click", ".xaf-action", () => {
        window.xaf.loadingIndicator.show();
        return false;
    });
    // used for SingleChoiceActions
    addChildEventListener(rootElement, "click", "[data-xaf-action] > button:first-child", () => {
        window.xaf.loadingIndicator.show();
        return false;
    });
    function onElementRemovedFromDOM(element, callback) {
        let parent = element.parentNode,
            mutationObserver = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    mutation.removedNodes.forEach(node => {
                        if (node === element) {
                            mutationObserver.disconnect();
                            callback();
                        }
                    });
                });
            });
        mutationObserver.observe(parent, {
            childList: true,
        });
        element.disconnectRemovedFromDomObserver = function () {
            mutationObserver.disconnect();
        }
    }

    function reportViewerCreated() {
        window.xaf.resizeObserverUtils.subscribeToResizeObservers(".dx-blazor-reporting>*:only-child", "reportResizeObserver");
    }
    function reportViewerDestroyed() {
        window.xaf.resizeObserverUtils.unsubscribeFromResizeObservers("reportResizeObserver");
        xaf.reportDesignerInstance = undefined;
        xaf.reportDesignerActions = undefined;
    }
    function onBeforeRenderReportDesigner(s, e) {
        if (IsNewReport) {
            var subscription = s.GetDesignerModel().navigateByReports.currentTab.subscribe((newValue) => {
                s.RunWizard("DesignInReportWizard");
                subscription.dispose();
                newValue.url("");
            });
        }
        xaf.reportDesignerInstance = s;
    }
    function isReportDesignerModified() {
        var designer = xaf.reportDesignerInstance;
        if (designer && designer.GetDesignerModel()) {
            var currentTab = designer.GetDesignerModel().navigateByReports.currentTab();
            if (currentTab && currentTab.undoEngine) {
                return currentTab.undoEngine.undoEnabled();
            }
        }
        return false;
    }
    var IsNewReport;
    function setIsNewReport(isNewReport) {
        IsNewReport = isNewReport;
    }
    var ParametersTypes = null;
    var ParametersTypesKeysCache = new Set();
    function setParametersTypes(parametersTypes) {
        ParametersTypes = parametersTypes;
    }
    var HiddenReportDesignerActions;
    function setHiddenReportDesignerActions(hiddenActions) {
        HiddenReportDesignerActions = hiddenActions;
    }
    function onCustomizeMenuActionsReportDesigner(s, e) {
        if (ParametersTypes) {
            initParametersTypes(s);
            ParametersTypes = null;
        }
        var saveAction = e.GetById(s.dx.Reporting.Designer.Actions.ActionId.Save);
        if (saveAction) {
            saveAction.container = "toolbar";
            e.Actions.splice(e.Actions.indexOf(saveAction), 1);
            e.Actions[0].hasSeparator = true;
            e.Actions.splice(0, 0, saveAction);
            var nativeAction = saveAction.clickAction;
            saveAction.clickAction = function () {
                var currentTab = s.GetDesignerModel().navigateByReports.currentTab();
                if (!currentTab.context().url()) {
                    var layout = s.GetDesignerModel().model().serialize();
                    s.dx.Reporting.Designer.ReportStorageWeb.setNewData(layout, '').done(function (jsonResult) {
                        currentTab.context().url(jsonResult);
                        currentTab.undoEngine.clearHistory();
                        s.dx.Analytics.Internal.ShowMessage(s.dx.Analytics.Utils.getLocalization("The report has been successfully saved.", "ASPxReportsStringId.ReportDesigner_SaveReport_Message_OK"), s.dx.Analytics.Internal.NotifyType.success);
                    }).fail(function (error) { });
                }
                else {
                    nativeAction();
                    currentTab.undoEngine.clearHistory();
                }
            }
        }
        for (index = 0; index < HiddenReportDesignerActions.length; ++index) {
            var actions = e.Actions.filter(function (x) { return x.id === HiddenReportDesignerActions[index] });
            if (actions.length > 0) {
                e.Actions.splice(e.Actions.indexOf(actions[0]), 1);
            }
        }
        xaf.reportDesignerActions = e;
    }
    function onBeforeRenderReportViewer(s, e) {
        e.reportPreview.zoom(1);
    }
    function initParametersTypes(s) {
        for (var type in ParametersTypes) {
            if(!ParametersTypesKeysCache.has(type)) {
                s.AddParameterType({ value: type, displayValue: ParametersTypes[type], defaultValue: '', typeImage: '' }, null);
                ParametersTypesKeysCache.add(type);
            }
        }
    }

    window.xaf = {
        easytest: createEasyTest(),
        reportViewerCreated: reportViewerCreated,
        reportViewerDestroyed: reportViewerDestroyed,
        onBeforeRenderReportDesigner: onBeforeRenderReportDesigner,
        isReportDesignerModified: isReportDesignerModified,
        onCustomizeMenuActionsReportDesigner: onCustomizeMenuActionsReportDesigner,
        setHiddenReportDesignerActions: setHiddenReportDesignerActions,
        onBeforeRenderReportViewer: onBeforeRenderReportViewer,
        setIsNewReport: setIsNewReport,
        setParametersTypes: setParametersTypes,
        getColumnChooserTargetSelector: getColumnChooserTargetSelector,
        loadingIndicator: createLoadingIndicator(),
        resizeObserverUtils: {
            subscribeToResizeObservers(containerSelector, observerVarName) {
                const mainContents = Array.from(document.getElementsByClassName("main-content"));
                const mainContentsToSkip = Array.from(document.querySelectorAll(".modal-content .main-content"));
                mainContents.filter(e => mainContentsToSkip.indexOf(e) < 0).forEach(mainContent => {
                    try {
                        const resizeObserver = new ResizeObserver(entries => {
                            entries.forEach(entry => {
                                window.xaf.resizeObserverUtils.updateContainerViewPortHeight(entry.target, containerSelector, observerVarName);
                            });
                        });
                        mainContent.dashboardResizeObserver = resizeObserver;
                        resizeObserver.observe(mainContent);
                    }
                    catch (e) { }
                    finally {
                        window.xaf.resizeObserverUtils.updateContainerViewPortHeight(mainContent, containerSelector, observerVarName);
                    }
                });
            },
            updateContainerViewPortHeight(viewPortElement, containerSelector, observerVarName) {
                var containerElements = document.querySelectorAll(containerSelector);
                if (containerElements.length > 1) {
                    return;
                }
                if (containerElements.length == 0) {
                    window.xaf.resizeObserverUtils.unsubscribeFromResizeObservers(observerVarName);
                }
                var containerElement = containerElements[0];
                if (containerElement) {
                    containerElement.style.height = window.xaf.resizeObserverUtils.getContainerViewPortHeight(viewPortElement, containerElement);
                }
            },
            getContainerViewPortHeight(viewPortElement, containerElement) {
                const props = ["margin-top", "margin-bottom", "padding-top", "padding-bottom", "border-top-width", "border-bottom-width"];
                var offset = 0;
                var computedStyles = getComputedStyle(viewPortElement);
                props.forEach(prop => {
                    offset += parseInt(computedStyles[prop]);
                });
                for (var container = containerElement.parentElement; container && container !== viewPortElement; container = container.parentElement) {
                    computedStyles = getComputedStyle(container);
                    props.forEach(prop => {
                        offset += parseInt(computedStyles[prop]);
                    });
                }
                return `${viewPortElement.clientHeight - offset}px`;
            },
            unsubscribeFromResizeObservers(observerVarName) {
                Array.from(document.getElementsByClassName("main-content")).forEach(mainContent => {
                    if (mainContent[observerVarName]) {
                        mainContent[observerVarName].disconnect();
                        delete mainContent[observerVarName];
                    }
                });
            }
        },
        removeGlobalClickHandler(element) {
            if (element.GlobalClickHandler) {
                document.removeEventListener("pointerdown", element.GlobalClickHandler);
                delete element.GlobalClickHandler;
            }
        },
        addGlobalClickHandler(element, callback) {
            element.GlobalClickHandler = function (e) {
                var dropdown = e.target.closest("dxbl-dropdown");
                if (element === e.target || !(element.contains(e.target) || (dropdown && element.contains(dropdown.placementTargetElement)))) {
                    callback(e);
                }
            };
            document.addEventListener("pointerdown", element.GlobalClickHandler);
        },
        resetMainContentScrollPosition() {
            // for T1113652 -- prevent resetting scroll that has been set for the default focused item
            const InputTagList = ['input', 'textarea', 'button', 'select'];
            if (InputTagList.indexOf(document.activeElement.tagName.toLowerCase()) === -1) {
                var mainContent = document.getElementsByClassName("main-content")[0];
                if (mainContent) {
                    mainContent.scrollTop = 0;
                    mainContent.scrollLeft = 0;
                }
            }
        },
        executeParametrizedAction(buttonElement, input) {
            buttonElement.focus();
            buttonElement.click();
            input.focus();
        },
        toogleDetailedErrorDescription() {
            var detailedError = document.getElementById("error-detailed");
            if (detailedError) {
                detailedError.style.maxHeight = detailedError.style.maxHeight ? "" : (detailedError.scrollHeight + 2) + "px";
                detailedError.classList.toggle("show");
            }
        },
        bindButtonToContainer(id) {
            let buttonElement = document.getElementById(id);
            let input = buttonElement.closest('.parametrized-action-wrapper').querySelector("input");
            if (input) {
                input.addEventListener("keypress",
                    function (args) {
                        if (args.key === 'Enter') {
                            input.blur();
                            setTimeout(function () {
                                xaf.executeParametrizedAction(buttonElement, input);
                            });
                        }
                    });
            }
        },
        toggleSideBar() {
            var app = document.getElementsByClassName("app")[0];
            app.classList.toggle("collapse-toggle");
        },
        closeSideBarIfMobile() {
            if (xaf.device.isMobile()) {
                var app = document.getElementsByClassName("app")[0];
                app.classList.remove("collapse-toggle");
            }
        },
        focusViewItem(caption) {
            if (!xaf.device.isTouchDevice()) {
                caption = caption && caption.replace ? caption.replace(/\\/g, "\\\\").replace(/'/g, "\\'") : caption;
                let primaryItems = document.querySelectorAll("div[data-item-name='" + caption + "'] + div input, div[data-item-name='" + caption + "'] + div textarea");
                if (primaryItems.length >= 1) {
                    let primaryItem = primaryItems[primaryItems.length - 1];
                    setTimeout(() => {
                        primaryItem.focus();
                        primaryItem.scrollIntoView({ block: "center" });
                    }, 0);
                }
            }
        },
        alert: {
            timeout: null,
            userTimeout: null,
            onMouseEnter() {
                clearTimeout(this.timeout);
                this.timeout = null;
            },
            onMouseLeave() {
                this.autoCloseAlerts(this.userTimeout);
            },
            disableScrollRequestsCount: 0,
            toggleScrolling(enabled) {
                enabled ? this.disableScrollRequestsCount-- : this.disableScrollRequestsCount++;
                var scrollContainer = document.querySelector(".xaf-alerts-stack-scrollable");
                scrollContainer.classList.toggle("scrolling-enabled", this.disableScrollRequestsCount === 0);
            },
            addAnimationEndEventListener(element, animationEndEvent) {
                if (element.animationEndCallback) {
                    element.animationEndCallback();
                }
                element.animationEndCallback = animationEndEvent;
                onElementRemovedFromDOM(element, animationEndEvent);
                element.addEventListener('animationend', animationEndEvent);
            },
            removeAnimationEndEventListener(element, animationEndEvent) {
                delete element.animationEndCallback;
                element.disconnectRemovedFromDomObserver();
                element.removeEventListener('animationend', animationEndEvent);
            },
            setVisible(element, visible, animateOnlyTargetElement) {
                this.toggleScrolling(false);
                return new Promise((resolve, reject) => {
                    var animationEndEvent = (e) => {
                        this.removeAnimation(element, visible);
                        this.removeAnimationEndEventListener(element, animationEndEvent);
                        this.toggleScrolling(true);
                        if (!e) {
                            reject();
                        } else {
                            resolve();
                        }
                    };
                    this.addAnimationEndEventListener(element, animationEndEvent);
                    this.addAnimation(element, visible);
                    if (!animateOnlyTargetElement) {
                        this.addAnimationToAlreadyDisplayedAlerts(element, visible);
                    }
                });
            },
            addAnimation(element, visible) {
                element.classList.add("show");
                element.classList.toggle("showing", visible);
                element.classList.toggle("hiding", !visible);
            },
            removeAnimation(element, visible) {
                element.classList.toggle("show", visible);
                element.classList.remove("showing");
                element.classList.remove("hiding");
            },
            addAnimationToAlreadyDisplayedAlerts(element, visible) {
                var alerts = this.getAlerts(":not(.xaf-alert-summary)");
                alerts.forEach((alert, index) => {
                    if (alert === element) {
                        return;
                    }
                    var animationEndEvent = () => {
                        alert.classList.remove("showing");
                        alert.classList.remove("moving-down");
                        this.removeAnimationEndEventListener(alert, animationEndEvent);
                    };
                    var addAnimationToAlert = (animationName) => {
                        this.addAnimationEndEventListener(alert, animationEndEvent);
                        alert.classList.add(animationName);
                    };
                    if (visible) {
                        addAnimationToAlert("showing");
                    } else if (!alert.classList.contains("hiding")) {
                        if (index < alerts.indexOf(element) || element.classList.contains("xaf-alert-summary")) {
                            addAnimationToAlert("moving-down");
                        }
                    }

                });
            },
            autoCloseAlerts(timeout) {
                this.userTimeout = timeout;
                if (xaf.device.isMobile()) {
                    return;
                }
                clearTimeout(this.timeout);
                this.timeout = setTimeout(function () {
                    var closeAllButton = document.querySelector(".xaf-alerts-stack:not(.xaf-alerts-stack-no-limit-count) #xaf-alert-summary-close-all-button");
                    if (closeAllButton) {
                        closeAllButton.click();
                    }
                    this.timeout = null;
                }, timeout);
            },
            closeAlerts() {
                var alertsToClose = this.getAlerts(":not(.xaf-alert-summary)");
                return Promise.all(alertsToClose.map(alert => this.setVisible(alert, false, true)));
            },
            getAlerts(postSelector) {
                var postSelectorString = postSelector ? postSelector : "";
                return Array.from(document.querySelectorAll(".xaf-alerts-stack .xaf-alert" + postSelectorString));
            },
            toggleSettingsContainer(event) {
                event.target.closest(".xaf-alert-settings-container").classList.toggle("hover");
            }
        },
        device: {
            isMobile() {
                return innerWidth <= 576;
            },
            isTouchDevice() {
                try {
                    document.createEvent("TouchEvent");
                    return true;
                } catch (e) {
                    return false;
                }
            }
        },
        progressBar: {
            _setProgress(progressBarElement, percent) {
                progressBarElement.setAttribute("style", "width: " + percent + "%;");
                progressBarElement.setAttribute("aria-valuenow", percent);
            },
            hide(progressBarElement) {
                setTimeout(() => { // UXFeature: Timeout for smoothly hiding progressbar;
                    progressBarElement.parentElement.classList.add("d-none");
                    xaf.progressBar._setProgress(progressBarElement, 0);
                }, 400);
            },
            update(progressBarElement, value, maxvalue) {
                var percent = Math.floor((100 * value) / maxvalue);
                if (progressBarElement.parentElement.classList.contains("d-none")) {
                    progressBarElement.parentElement.classList.remove("d-none");
                }
                xaf.progressBar._setProgress(progressBarElement, percent);
            }
        },
        imageMobile: {
            shadow: ".xaf-image-mobile-menu-popup",
            initMobilePopupShadow(targetId) {
                let shadowElement = document.querySelector(xaf.imageMobile.shadow).parentElement;
                shadowElement.onclick = function () {
                    xaf.imageMobile.getDotNetInstance(targetId).invokeMethodAsync("HideMobilePopupMenu");
                    xaf.closeOutsideClickController.hide(targetId);
                };
            },
            DotNetInstance: {},
            initDotNetInstance(targetId, instance) {
                xaf.imageMobile.DotNetInstance[targetId] = instance;
            },
            getDotNetInstance(targetId) {
                return xaf.imageMobile.DotNetInstance[targetId];
            },
            disposeDotNetInstance(targetId) {
                delete xaf.imageMobile.DotNetInstance[targetId];
            },
            openMenu(targetId) {
                xaf.closeOutsideClickController.show(targetId, xaf.imageMobile.shadow);
            }
        },
        image(menuElementId, mainElementId, forceMobileLayout) {
            var isMobile = xaf.device.isMobile() || forceMobileLayout === "True";
            if (isMobile) {
                var targetId = mainElementId;
                var shadow = xaf.imageMobile.shadow;
            } else {
                targetId = menuElementId;
                shadow = document.getElementById(targetId).parentElement;
            }
            return {
                showFileDialog(uploadComponentId, isImageLoaded) {
                    if (!isImageLoaded) {
                        xaf.uploadComponent.open(uploadComponentId);
                        this.hideMenu();
                    } else if (isMobile) {
                        this.toggleMenu();
                    }
                },
                onShadowClick(e) {
                    var buttonElement = shadow.getElementsByClassName("xaf-image-button")[0];
                    if (!buttonElement.contains(e.target)) {
                        this.hideMenu();
                    }
                },
                toggleMenu() {
                    var isVisible = xaf.closeOutsideClickController.isVisible(targetId);
                    isVisible ? this.hideMenu() : this.openMenu();
                },
                openMenu() {
                    if (isMobile) {
                        xaf.imageMobile.getDotNetInstance(targetId).invokeMethodAsync("ShowMobilePopupMenu");
                    } else {
                        xaf.closeOutsideClickController.show(targetId, shadow);
                        xaf.createDropDownPositionController(document.getElementById(targetId), shadow.getElementsByClassName("xaf-image-button")[0]);
                    }
                },
                hideMenu() {
                    if (isMobile) {
                        xaf.imageMobile.getDotNetInstance(targetId).invokeMethodAsync("HideMobilePopupMenu");
                    }
                    xaf.closeOutsideClickController.hide(targetId);
                }
            };
        },
        uploadComponent: {
            open(id) {
                var clickEvent = new MouseEvent("click", {
                    "view": window,
                    "bubbles": false,
                    "cancelable": true
                }),
                    fileInputElement = document.getElementById(id);
                if (fileInputElement) {
                    fileInputElement.dispatchEvent(clickEvent);
                }
            },
            init(inputElement, instance) {
                inputElement.addEventListener('change', function () {
                    var file = inputElement.files[0];
                    if (!file) return;
                    var maxFileSize = inputElement.getAttribute('data-max-size');
                    if (maxFileSize && maxFileSize > 0 && file.size > maxFileSize) {
                        alert('File size must be less than ' + maxFileSize / (1024 * 1024) + ' MB');
                    } else {
                        var fileInfo = {
                            name: file.name,
                            size: file.size,
                            type: file.type
                        };
                        inputElement.readPromise = new Promise(function (resolve, reject) {
                            var reader = new FileReader();
                            reader.onload = function () { resolve(reader.result); };
                            reader.onerror = function (err) { reject(err); };
                            reader.readAsArrayBuffer(file);
                        });
                        instance.invokeMethodAsync('Upload', fileInfo);
                    }
                });
            },
            clear: function (inputElement) {
                inputElement.value = null;
            },
            readFileData: function (inputElement, startOffset, count) {
                return inputElement.readPromise.then(function (arrayBuffer) {
                    return new Uint8Array(arrayBuffer, startOffset, count);
                });
            }
        }
    }
}());

(function () {
    function setCookie(cookieName, value) {
        var date = new Date(Date.now() + 86400e3);
        document.cookie = cookieName + "=" + encodeURIComponent(value) + "; expires=" + date.toUTCString() + "; path=/";
    };
    function setSizeMode(cookieName, sizeMode) {
        setCookie(cookieName, sizeMode);
    };
    function setCurrentCulture(cookieName, cultureName) {
        setCookie(cookieName, cultureName);
    };
    function setTheme(linkId, cookieName, themeName, themeHref) {
        var link = document.getElementById(linkId);
        if (link) {
            link.href = themeHref;
            setCookie(cookieName, themeName);
        }
    };
    xaf.themeService = { setSizeMode, setTheme, setCurrentCulture };
}());
(function () {
    function getMainElement(id) {
        return document.getElementById(id);
    }
    function getShadowElement(shadow) {
        return typeof shadow === "string" ? document.querySelector(shadow) : shadow;
    }
    function isVisible(id) {
        return getMainElement(id).classList.contains('show-dropdown');
    };
    function toggle(id, shadow) {
        isVisible(id) ? hide(id) : show(id, shadow);
    };
    function show(id, shadow) {
        var mainElement = getMainElement(id);
        var shadowElement = getShadowElement(shadow);
        xaf.addGlobalClickHandler(mainElement, function (e) {
            if (!shadowElement.contains(e.target)) {
                hide(id);
            }
        });
        mainElement.classList.add('show-dropdown');
    };
    function hide(id) {
        var mainElement = getMainElement(id);
        xaf.removeGlobalClickHandler(mainElement);
        mainElement.classList.remove('show-dropdown');
        if (mainElement._onhide) {
            mainElement._onhide();
        }
    };
    xaf.closeOutsideClickController = { toggle, show, hide, isVisible };
})();

(function () {
    function createDropDownPositionController(dropDownElement, sourceElement) {
        const
            sourceElementBottom = parseFloat(getComputedStyle(sourceElement).bottom),
            dropDownBottom = sourceElement.scrollHeight + 1.5 * sourceElementBottom,
            intersectedDropDownBottom = 0.5 * sourceElementBottom - dropDownElement.scrollHeight,
            markerElement = document.createElement("div");
        markerElement.style.position = "absolute";
        markerElement.style.bottom = `${dropDownElement.scrollHeight + dropDownBottom - 12}px`; // 12 is padding from .xaf-image-menu-content
        dropDownElement.parentElement.appendChild(markerElement);
        dropDownElement.style.right = getComputedStyle(sourceElement).right;
        dropDownElement.intersectionObserver = new IntersectionObserver(entries => {
            let entry = entries[0];
            if (entry.target === markerElement) {
                dropDownElement.style.bottom = `${!entry.isIntersecting ? intersectedDropDownBottom : dropDownBottom}px`;
            }
        });
        dropDownElement.intersectionObserver.observe(markerElement);
        dropDownElement._onhide = function () {
            if (dropDownElement.intersectionObserver) {
                dropDownElement.parentElement.removeChild(markerElement);
                dropDownElement.intersectionObserver.disconnect();
                delete dropDownElement.intersectionObserver;
                delete dropDownElement._onhide;
            }
        }
    }
    xaf.createDropDownPositionController = createDropDownPositionController;
})();

(function () {
    document.addEventListener("keypress", function (e) {
        if (e.target && e.target.tagName.toLowerCase() === 'input' && e.keyCode === 13 && !xaf.loadingIndicator.isShowing()) {
            let primaryItem = document.querySelector('.logon-toolbar .dxbl-toolbar .dxbl-btn.dxbl-btn-primary');
            if (primaryItem) {
                e.target.blur();
                setTimeout(() => { primaryItem.click(); });
            }
        }
    });
})();

(function () {
    function createConfirmUnsavedChangesController() {
        var isModified = false;

        function getClientSideModifiedState() {
            return xaf.isReportDesignerModified();
        }
        function attachWindowEvent(name, handler) {
            window.addEventListener(name, handler, false);
        }
        function IsModified() {
            return isModified || getClientSideModifiedState();
        }
        function CustomOnBeforeUnload(e) {
            if (IsModified()) {
                e.returnValue = false;
                return false;
            }
        }
        this.SetModified = function (_isModified) {
            isModified = _isModified;
        }
        this.GetClientSideState = function () {
            return getClientSideModifiedState();
        }

        attachWindowEvent("beforeunload", CustomOnBeforeUnload);
    }
    xaf.ConfirmUnsavedChangesController = new createConfirmUnsavedChangesController();
})();

(function () {
    // helps process clicks on <a> elements in the navigation component's markup
    class XafNavigationClickHelper extends HTMLElement {
        constructor() {
            super();
            this.isInitialized = false;
        }
        connectedCallback() {
            if (!this.isInitialized) {
                this.isInitialized = true;
                // prevents regular clicks (e.g. left mouse button) on a link
                this.addEventListener("click", ev => {
                    const isLinkClicked = ev.composedPath().find(el => el.tagName?.toLowerCase() === "a");
                    if (isLinkClicked) {
                        ev.preventDefault();
                    }
                });
                // allows ctrl-clicks on a link
                this.addEventListener("click", ev => {
                    if (ev.ctrlKey) {
                        ev.stopImmediatePropagation();
                        const isFakeLinkClicked = ev.composedPath().find(el =>
                            el.tagName?.toLowerCase() === "a"
                            && el.getAttribute("href") === "#");
                        if (isFakeLinkClicked) {
                            ev.preventDefault();
                        } else {
                            let auxclickEvent = new MouseEvent("auxclick", ev);
                            this.dispatchEvent(auxclickEvent);
                        }
                    }
                }, { capture: true });
                // prevents auxiliary clicks (e.g. middle mouse button) on <a href="#">-like elements
                this.addEventListener("auxclick", ev => {
                    const isFakeLinkClicked = ev.composedPath().find(el =>
                        el.tagName?.toLowerCase() === "a"
                        && el.getAttribute("href") === "#");
                    if (isFakeLinkClicked) {
                        ev.preventDefault();
                    }
                });
            }
        }
    }
    customElements.define("xaf-navigation-click-helper", XafNavigationClickHelper);
})();