<div class="container">
    <div class="page-header">
        <h2>Rounds</h2>
    </div>
    <div class="row">
        <form role="form">
            <div class="form-group form-horizontal">
                <label class="col-md-3 control-label" for="contestantOneTotalWill">Contestant One Total Will:</label>
                <input class="col-md-1" type="number" id="contestantOneTotalWill" readonly >
            </div>
        </form>
        <form role="form" class="col-md-offset-1">
            <div class="form-group form-horizontal">
                <label class="col-md-4 control-label" for="contestantTWoTotalWill">Contestant Two Total Will:</label>
                <input class="col-md-1" type="number" id="contestantTWoTotalWill" readonly >
            </div>
        </form>
    </div>
    <div class="row">
        <form role="form">
            <div class="form-group form-horizontal">
                <label class="col-md-3 control-label" for="permanentModifier">Permanent Modifier:</label>
                <input class="col-md-1" type="number" id="permanentModifier" readonly >
            </div>
        </form>
    </div>
    <div class="row">
        <form role="form">
            <div class="form-group form-horizontal">
                <label class="col-md-3 control-label" for="temporaryModifier">Temporary Modifer:</label>
                <input class="col-md-1" type="number" id="temporaryModifier" readonly >
            </div>
        </form>
        <form role="form" class="col-md-offset-1">
            <div class="form-group form-horizontal">
                <label class="col-md-4 control-label" for="tempModifierExpRound">Temporary Modifier Expiration Round:</label>
                <input class="col-md-1" type="number" id="tempModifierExpRound" readonly value=<%- temporaryModifierExpirationRound %> >
            </div>
        </form>
    </div>
    <div class="row">
        <p></p>
    </div>
    <div class="row">
        <form role="form">
            <div class="col-md-offset-2 form-horizontal form-group">
                <p></p>
                <p>Rounds:
                    <button id="previousButton" type="button" class="btn btn-default">
                        <span class="fa fa-chevron-left"></span>
                        Previous
                    </button>
                    <span>Round: <%- currentRound %> </span>
                    <span> of: <%- totalNumberOfRounds %> </span>
                    <button id="nextButton" type="button" class="btn btn-default">
                        <span class="fa fa-chevron-right"></span>
                        Next
                    </button>
                    <button id="createNextRoundButton" type="button" class="btn btn-default"> Create Next Round</button>
                </p>
            </div>
        </form>
    </div>
</div>