<div class="container">
    <div class="page-header">
        <h2>Rounds</h2>
    </div>
    <div class="row">
        <form role="form">
            <div class="form-group form-horizontal">
                <label class="col-md-3 control-label left" for="contestantOneTotalWill">Contestant One Total
                    Will:</label>
                <input data-toggle="tooltip" title="<%- contestantOneTotalWillDescription %>" class="col-md-1"
                       type="number" id="contestantOneTotalWill" readonly value=<%-
                       contestantOneTotalWill %>>
            </div>
        </form>
        <form role="form" class="col-md-offset-1">
            <div class="form-group form-horizontal">
                <label class="col-md-6 control-label" for="contestantTwoTotalWill">Contestant Two Total Will:</label>
                <input data-toggle="tooltip" title="<%- contestantTwoTotalWillDescription %>" class="col-md-1"
                       type="number" id="contestantTwoTotalWill" readonly value=<%-
                       contestantTwoTotalWill %> >
            </div>
        </form>
    </div>

    <div class="row">
        <form role="form">
            <div class="col-md-3">
                <h3>Consequence</h3>
            </div>
        </form>
    </div>
    <div class="row">
        <form role="form" class="col-md-offset-2 col-md-4">
            <label class="control-label">Description:</label>
        </form>
    </div>
    <div class="row">
        <form role="form">
            <div class="col-md-offset-2">
                <p> <%- consequence %> </p>
            </div>
        </form>
    </div>
    <div class="row">
        <form role="form">
            <div class="form-group form-horizontal">
                <label class="col-md-4 control-label" for="permanentModifier">Permanent Modifier:</label>
                <input class="col-md-1" type="number" id="permanentModifier" readonly value=<%- permanentModifier %>>
            </div>
        </form>
    </div>
    <div class="row">
        <form role="form">
            <div class="form-group form-horizontal">
                <label class="col-md-4 control-label" for="temporaryModifier">Temporary Modifer:</label>
                <input class="col-md-1" type="number" id="temporaryModifier" readonly value=<%- temporaryModifier %>>
            </div>
        </form>
    </div>
    <div class="row">
        <form role="form">
            <div class="form-group form-horizontal">
                <label class="col-md-4 control-label" for="tempModifierExpRound">Temporary Modifier Expiration
                    Round:</label>
                <input class="col-md-1" type="number" id="tempModifierExpRound" readonly value=<%-
                       temporaryModifierExpirationRound %>>
            </div>
        </form>
    </div>
    <div class="row">
        <form role="form">
            <div class="col-md-offset-2 form-horizontal form-group">
                <br>
                <p>Rounds:
                    <button id="previousButton" type="button" class="btn btn-default">
                        <span class="fa fa-chevron-left"></span>
                        Previous
                    </button>
                    <b>
                        <span>Round: <%- roundToShow %> </span>
                        <span> of: <%- totalNumberOfRounds %> </span>
                    </b>
                    <button id="nextButton" type="button" class="btn btn-default">
                        <span class="fa fa-chevron-right"></span>
                        Next
                    </button>
                    <button id="createNextRoundButton" type="button" class="btn btn-default"> Create Next Round
                    </button>
                </p>
            </div>
        </form>
    </div>
</div>
</div>