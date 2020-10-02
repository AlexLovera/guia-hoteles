$(() => {
    $("[data-toggle='tooltip']").tooltip();
    $("[data-toggle='popover']").popover();
    $('.carousel').carousel({
        interval: 2000
    });

    function cambiarColorYEstadoDeBotonParaModal(eventoModal, claseARemover, claseAAgregar, estaHabilitado) {
        $('#unirse').on(eventoModal, (e) => {
            console.log('el modal acaba de mostrarse');

            // se va a utilizar el boton en si...
            $('#unirseBtn').removeClass(claseARemover);
            $('#unirseBtn').addClass(claseAAgregar);
            $('#unirseBtn').prop('disabled', estaHabilitado);
        });
    }
    cambiarColorYEstadoDeBotonParaModal('show.bs.modal', 'btn-primary', 'btn-success', true);
    cambiarColorYEstadoDeBotonParaModal('hide.bs.modal', 'btn-success', 'btn-primary', false);
    /*
                //se aplica sobre el div que es el modal en si
                $('#unirse').on('show.bs.modal', (e) => {
                    console.log('el modal acaba de mostrarse');

                    // se va a utilizar el boton en si...
                    $('#unirseBtn').removeClass('btn-primary');
                    $('#unirseBtn').addClass('btn-success');
                    $('#unirseBtn').prop('disabled', true);
                });

                $('#unirse').on('hide.bs.modal', (e) => {
                    console.log('el modal acaba de mostrarse');

                    // se va a utilizar el boton en si...
                    $('#unirseBtn').removeClass('btn-success');
                    $('#unirseBtn').addClass('btn-primary');
                    $('#unirseBtn').prop('disabled', false);
                });
    */
});