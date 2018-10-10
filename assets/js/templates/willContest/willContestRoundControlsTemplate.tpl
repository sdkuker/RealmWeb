<div class="container">
    <div class="row">
        <form role="form" class="col-md-offset-1">
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
        </form>
    </div>
</div>