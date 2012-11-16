views.Filters = Backbone.View.extend({
    initialize: function () {
        this.collection.on('update', this.render, this);
    },
    render: function(keypress) {
        var view = this,
            filterModels = [],
            chartModels = [],
            active = this.collection.where({ active: true }),
            chartType = 'budget',
            chartTypeExp = 'expenditure',
            donor = '';

        if(active.length) {

            // Use donor level financial data if available
            if (active[0].collection.id === 'donors') {
                chartType = 'donorBudget';
                chartTypeExp = 'donorExpenditure';
                donor = active[0].id;
            }

            // Add a filtered class to all parent containers
            // where an active element has been selected.
            _(active).each(function(a) {
                $('#' + a.collection.id).toggleClass('filtered', true);
            });

            filterModels = active;
            chartModels = active;
        } else {
            this.collection.sort();

            filterModels = this.collection.filter(function(model) {
                    var length = (model.collection.where({ visible: true }).length > 100) ? 1 : 0;
                    return (model.get('visible') && model.get('count') > length);
                });

            chartModels = _(this.collection.sortBy(function(model) {
                    return -1 * model.get(chartType) || 0;
                })
                .filter(function(model) {
                    return (model.get(chartType) > 0);
                }))
                .first(20);
            if (this.collection.id === 'operating_unit') {
                $('#applied-filters').addClass('no-country');
            }
            if (this.collection.id === 'region') {
                $('#applied-filters').addClass('no-region');
            }
        }


        if (filterModels.length) {
            this.$el.html(templates.filters(this));
            app.description =  app.description || ['The following includes projects'];

            _(filterModels).each(function(model) {

                view.$('.filter-items').append(templates.filter({ model: model }));
                $('#' + view.collection.id + '-' + model.id).toggleClass('active', model.get('active'));
                if (model.get('active') && !keypress) {
                    $('#breadcrumbs ul').append(
                        '<li><a href="/undp-projects/#filter/'
                        + view.collection.id + '-'
                        + model.get('id') + '">'
                        + model.get('name').toLowerCase().toTitleCase()
                        + '</a></li>'
                    );

                    if (view.collection.id === 'operating_unit') {
                        $('#applied-filters').removeClass('no-country');
                        app.description.push(' for the <strong>' + model.get('name').toLowerCase().toTitleCase() + '</strong> office');
                    }
                    if (view.collection.id === 'region') {
                        $('#applied-filters.no-country').removeClass('no-region');
                        app.description.push(' in the <strong>' + model.get('name').toLowerCase().toTitleCase() + '</strong> region');
                    }
                    if (view.collection.id === 'donors') {
                        app.description.push(' funded by the <strong>' + model.get('name').toLowerCase().toTitleCase() + '</strong>');
                    }
                    if (view.collection.id === 'focus_area') {
                        app.description.push(' with a focus on <strong>' + model.get('name').toLowerCase().toTitleCase() + '</strong>');
                    }
                }
            });

        } else {
            this.$el.empty();
        }

        $('#chart-' + this.collection.id + '.rows').empty();

        if (chartModels.length <= 1 && this.collection.id !== 'focus_area') {
            $('#chart-' + this.collection.id)
                .css('display','none');
        } else {
            if ($('.stat-chart').hasClass('full')) {
                $('.stat-chart').removeClass('full');
                $('#chart-' + this.collection.id)
                    .css('display','block');
            } else {
                $('#chart-' + this.collection.id)
                    .addClass('full')
                    .css('display','block');
            }

            if (this.collection.id === 'focus_area') {
                $('#chart-' + this.collection.id).empty();
                chartModels = this.collection.models;

                var total = chartModels.reduce(function(memo, model) {
                    return memo + (model.get(chartType) || 0 ); 
                }, 0);

                _(chartModels).each(function(model, i) {
                    $('#chart-' + model.collection.id).append(
                        '<div class="focus fa' + model.id + '">' +
                        '    <div class="fa-icon"></div>' +
                        '    <div class="caption"></div>' +
                        '    <div class="pct"></div>' +
                        '</div>');

                    $('.fa' + (model.id) + ' .caption').text(model.get('name').toLowerCase().toTitleCase());
                    $('.fa' + (model.id) + ' .pct').text(((model.get(chartType) || 0) / total * 100).toFixed(0) + '%');
                });
            } else {

                var max = chartModels[0].get(chartType);

                $('#chart-' + this.collection.id + ' .rows').html('');
                _(chartModels).each(function(model) {
                    var budget = accounting.formatMoney(model.get(chartType)/1000000) + 'M';
                    var expenditure = accounting.formatMoney(model.get(chartTypeExp)/1000000) + 'M';
                    var caption = '<a href="#filter/' + model.collection.id + '-' + model.get('id')
                        + '">' + model.get('name').toLowerCase().toTitleCase() + '</a>';
                    var bar = '<div style="width: ' + (model.get(chartType)/ max * 100) + '%"></div>' + '<div class="subdata" style="width: ' + (model.get(chartTypeExp)/ max * 100) + '%"></div>';


                    $('#chart-' + model.collection.id + ' .rows').append(
                        '<tr>' +
                        '    <td>' + caption + '</td>' +
                        '    <td class="right">' + budget + '</td>' +
                        '    <td class="data">' + bar + '</td>' +
                        '</tr>');
                });
            }
        }

        return this;
    }
});
