import { SvelteComponent, init, safe_not_equal, element, attr, insert, noop, detach } from 'svelte/internal';
import 'svelte/internal/disclose-version';
import { createEventDispatcher, beforeUpdate, onMount, afterUpdate, onDestroy } from 'svelte';

var Events = [
  "beforeLinkedItemOpen",
  "linkedItemOpened",
  "beforeLinkedItemClose",
  "linkedItemClosed",
  "printReadyStateChange",
  "dataLoadRequestCompleted",
  "dataLoadError",
  "dataLoadCancelled",
  "dataLoadRequestCancelled",
  "dataUpdated",
  "dataUpdateCancelled",
  "dataLoadRequested",
  "beforeDataUpdate",
  "realTimeUpdateComplete",
  "chartCleared",
  "slicingEnd",
  "slicingStart",
  "entityRollOut",
  "entityRollOver",
  "entityClick",
  "connectorRollOver",
  "connectorRollOut",
  "connectorClick",
  "markerRollOver",
  "markerRollOut",
  "markerClick",
  "pageNavigated",
  "rotationEnd",
  "rotationStart",
  "centerLabelRollover",
  "centerLabelRollout",
  "centerLabelClick",
  "centerLabelChanged",
  "chartClick",
  "chartMouseMove",
  "chartRollOver",
  "chartRollOut",
  "backgroundLoaded",
  "backgroundLoadError",
  "legendItemClicked",
  "legendItemRollover",
  "legendItemRollout",
  "logoRollover",
  "logoRollout",
  "logoClick",
  "logoLoaded",
  "logoLoadError",
  "beforeExport",
  "exported",
  "exportCancelled",
  "beforePrint",
  "printComplete",
  "printCancelled",
  "dataLabelClick",
  "dataLabelRollOver",
  "dataLabelRollOut",
  "scrollStart",
  "scrollEnd",
  "onScroll",
  "zoomReset",
  "zoomedOut",
  "zoomedIn",
  "zoomed",
  "zoomModeChanged",
  "pinned",
  "dataRestored",
  "beforeDataSubmit",
  "dataSubmitError",
  "dataSubmitted",
  "dataSubmitCancelled",
  "chartUpdated",
  "nodeAdded",
  "nodeUpdated",
  "nodeDeleted",
  "connectorAdded",
  "connectorUpdated",
  "connectorDeleted",
  "labelAdded",
  "labelDeleted",
  "selectionRemoved",
  "selectionStart",
  "selectionEnd",
  "labelClick",
  "labelRollOver",
  "labelRollOut",
  "labelDragStart",
  "labelDragEnd",
  "dataplotDragStart",
  "dataplotDragEnd",
  "processClick",
  "processRollOver",
  "processRollOut",
  "categoryClick",
  "categoryRollOver",
  "categoryRollOut",
  "milestoneClick",
  "milestoneRollOver",
  "milestoneRollOut",
  "chartTypeChanged",
  "overlayButtonClick",
  "loaded",
  "rendered",
  "drawComplete",
  "renderComplete",
  "dataInvalid",
  "dataXMLInvalid",
  "dataLoaded",
  "noDataToDisplay",
  "legendPointerDragStart",
  "legendPointerDragStop",
  "legendRangeUpdated",
  "alertComplete",
  "realTimeUpdateError",
  "dataplotRollOver",
  "dataplotRollOut",
  "dataplotClick",
  "linkClicked",
  "beforeRender",
  "renderCancelled",
  "beforeResize",
  "resized",
  "resizeCancelled",
  "beforeDispose",
  "disposed",
  "disposeCancelled",
  "linkedChartInvoked",
  "beforeDrillDown",
  "drillDown",
  "beforeDrillUp",
  "drillUp",
  "drillDownCancelled",
  "drillUpCancelled"
];

const ATOMIC_DATA_TYPE = ['string', 'number', 'function', 'boolean', 'undefined'],
    charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    isResizeRequired = (oldConfig, newConfig) => {
        let { width, height } = oldConfig,
            newWidth = newConfig.width,
            newHeight = newConfig.height;

        if (width !== newWidth || height !== newHeight) {
            return true;
        }
        return false;
    },
    isChartTypeChanged = (oldConfig, newConfig) => {
        return (oldConfig.type !== newConfig.type);
    },
    cloneObject = (arg, purpose = 'clone') => {
        if ((ATOMIC_DATA_TYPE.indexOf(typeof arg) > -1) || arg === null) {
            return arg;
        }

        if (Array.isArray(arg)) {
            let i,
                len,
                arr = [];

            for (i = 0, len = arg.length; i < len; i++) {
                arr.push(cloneObject(arg[i], purpose));
            }

            return arr;
        } else if (typeof arg === 'object') {
            let cloneObj = {},
                key;

            for (key in arg) {
                if (key === 'data') {
                    if (arg[key] && arg[key]._dataStore) {
                        cloneObj[key] = (purpose === 'clone') ? arg[key] : '-'; 
                    } else {
                        cloneObj[key] = cloneObject(arg[key], purpose);
                    }
                } else {
                    cloneObj[key] = cloneObject(arg[key], purpose);
                }
            }

            return cloneObj;
        }
    },
    isDataSourceUpdated = (oldConfig, newConfig) => {
        return JSON.stringify(cloneObject(oldConfig.dataSource, 'diff')) !== JSON.stringify(cloneObject(newConfig.dataSource, 'diff'));
    },
    createUniqueId = (length = 20) => {
        let i,
            result = '',
            charactersLength = charSet.length;

        for (i = 0; i < length; i++) {
           result += charSet.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     };

/* src/index.svelte generated by Svelte v4.2.18 */

function create_fragment(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			attr(div, "class", /*className*/ ctx[0]);
			attr(div, "style", /*inlineStyle*/ ctx[1]);
			attr(div, "id", /*uniqueDivId*/ ctx[2]);
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		p(ctx, [dirty]) {
			if (dirty & /*className*/ 1) {
				attr(div, "class", /*className*/ ctx[0]);
			}

			if (dirty & /*inlineStyle*/ 2) {
				attr(div, "style", /*inlineStyle*/ ctx[1]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) {
				detach(div);
			}
		}
	};
}

let FusionCharts;

function fcRoot(core, ...modules) {
	FusionCharts = core;

	modules.forEach(m => {
		if (m.getName && m.getType || m.name && m.type) {
			core.addDep(m);
		} else {
			m(core);
		}
	});
}

function instance($$self, $$props, $$invalidate) {
	let { id, className = '', inlineStyle = '', type, renderAt, width, height, dataFormat = 'json', dataSource, chart } = $$props;
	let oldChartConfig, chartConfig, eventListerners = [];
	const dispatch = createEventDispatcher(), uniqueDivId = createUniqueId();

	/**
 * Life cycle method sequence
 * beforeUpdate -> onMount -> afterUpdate (during intial render)
 * beforeUpdate -> afterUpdate (during re-render)
 */
	beforeUpdate(() => {
		$$invalidate(3, renderAt = uniqueDivId);

		chartConfig = {
			id,
			type,
			renderAt,
			width,
			height,
			dataFormat,
			dataSource: cloneObject(dataSource)
		};
	});

	onMount(() => {
		if (!FusionCharts) {
			console.warn('Invalid FusionCharts constructor');
		} else {
			FusionCharts.ready(function () {
				$$invalidate(4, chart = new FusionCharts(chartConfig));
				chart.render();
			});

			Events.forEach((event, index) => {
				eventListerners.push(e => {
					dispatch(event, e);
				});

				FusionCharts.addEventListener(event, eventListerners[index]);
			});
		}
	});

	afterUpdate(() => {
		// If not the first render
		if (oldChartConfig) {
			if (isResizeRequired(oldChartConfig, chartConfig)) {
				chart.resizeTo(chartConfig.width, chartConfig.height);
			}

			if (isChartTypeChanged(oldChartConfig, chartConfig)) {
				chart.chartType(chartConfig.type, chartConfig);
			} else if (isDataSourceUpdated(oldChartConfig, chartConfig)) {
				chart.setJSONData(chartConfig.dataSource);
			}
		}

		oldChartConfig = cloneObject(chartConfig);
	});

	onDestroy(() => {
		chart.dispose();

		Events.forEach((event, index) => {
			FusionCharts.removeEventListener(event, eventListerners[index]);
		});
	});

	$$self.$$set = $$props => {
		if ('id' in $$props) $$invalidate(5, id = $$props.id);
		if ('className' in $$props) $$invalidate(0, className = $$props.className);
		if ('inlineStyle' in $$props) $$invalidate(1, inlineStyle = $$props.inlineStyle);
		if ('type' in $$props) $$invalidate(6, type = $$props.type);
		if ('renderAt' in $$props) $$invalidate(3, renderAt = $$props.renderAt);
		if ('width' in $$props) $$invalidate(7, width = $$props.width);
		if ('height' in $$props) $$invalidate(8, height = $$props.height);
		if ('dataFormat' in $$props) $$invalidate(9, dataFormat = $$props.dataFormat);
		if ('dataSource' in $$props) $$invalidate(10, dataSource = $$props.dataSource);
		if ('chart' in $$props) $$invalidate(4, chart = $$props.chart);
	};

	return [
		className,
		inlineStyle,
		uniqueDivId,
		renderAt,
		chart,
		id,
		type,
		width,
		height,
		dataFormat,
		dataSource
	];
}

class Src extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance, create_fragment, safe_not_equal, {
			id: 5,
			className: 0,
			inlineStyle: 1,
			type: 6,
			renderAt: 3,
			width: 7,
			height: 8,
			dataFormat: 9,
			dataSource: 10,
			chart: 4
		});
	}
}

export { Src as default, fcRoot };
