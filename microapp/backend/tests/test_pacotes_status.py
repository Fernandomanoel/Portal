from app.services.pacotes_calculo import _status


def test_realizado_igual_ao_previsto_em_dia():
    assert _status(realizada=5, previsto=5) == ("Em dia", 0)


def test_deficit_de_1_conta_como_em_dia():
    assert _status(realizada=4, previsto=5) == ("Em dia", 1)


def test_deficit_de_2_atrasado():
    assert _status(realizada=3, previsto=5) == ("Atrasado", 2)


def test_realizado_acima_do_previsto_adiantado():
    assert _status(realizada=6, previsto=5) == ("Adiantado", -1)
