(function (global) {
    var WeatherViewModel,
        app = global.app = global.app || {};

    WeatherViewModel = kendo.data.ObservableObject.extend({
        weatherDataSource: null,

        init: function () {
            var that = this,
                dataSource,
                jsonUrlToLoad;

            kendo.data.ObservableObject.fn.init.apply(that, []);

            //When you build for Apache Cordova 3.0.0, apply this code instead of using relative URLs. In Apache Cordova 3.0.0, relative URLs might not work properly.
            //jsonUrlToLoad = app.makeUrlAbsolute("data/weather.json");
            jsonUrlToLoad = "data/weather.json";

            dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: jsonUrlToLoad,
                        dataType: "json"
                    }
                }
            });
            
            //dataSource = new kendo.data.DataSource({ //dataSource configuration
            //    data: [
            //        { id: 1, item: "Item 1", order: 1 },
            //        { id: 2, item: "Item 2", order: 2 },
            //        { id: 3, item: "Item 3", order: 3 },
            //        { id: 4, item: "Item 4", order: 4 },
            //        { id: 5, item: "Item 5", order: 5 },
            //        { id: 6, item: "Item 6", order: 6 },
            //        { id: 7, item: "Item 7", order: 7 },
            //        { id: 8, item: "Item 8", order: 8 },
            //        { id: 9, item: "Item 9", order: 9 },
            //        { id: 10, item: "Item 10", order: 10 },
            //        { id: 11, item: "Item 11", order: 11 },
            //        { id: 12, item: "Item 12", order: 12 }
            //    ],
            //    sort: { field: "order", dir: "asc" },
            //    schema: {
            //        model: {
            //            id: "id",
            //            fields: {
            //                id: { type: "number" },
            //                item: { type: "string" },
            //                order: { type: "number" }
            //            }
            //        }
            //    }
            //});
            
        

            that.set("weatherDataSource", dataSource);
        }
    });
    function createTouchables() {
            this.element.find(".item").kendoTouch({
                touchstart: function(e) {
                    //store the original event, required in order to start dragging the element immediately
                    touchStartEvent = e.event;
                },
                hold: function(e) {
                    this.element.addClass("draggable");
                    this.element.kendoDraggable({
                        group: "listviewItems",
                        hint: generateHint,
                        //destroy the component when dragging is finished or canceled
                        dragend: destroyDraggable,
                        cancel: destroyDraggable
                    });

                    //the following code forces draggable element to start dragging immediately (without lifting the finder)
                    this.element.data("kendoDraggable").userEvents._start(touchStartEvent);
                }
            });
        }

    app.weatherService = {
        viewModel: new WeatherViewModel()
    };
})(window);