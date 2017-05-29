<div>
    <form class="form-inline" role="form">
        <label> Open Round: </label> <%- openRound %>
        <label for="displayedRoundNumber">Displayed Round:</label>
        <select class="form-control" id="displayedRoundNumber">
            <option>1</option>
        </select>
        <button id='nextRoundButton' type='button' class="btn btn-default">Next Round</button>
        <button id='deleteRoundButton' type='button' class="btn btn-default">Delete Round</button>
        <button id='criticalHitsButton' type='button' class="btn btn-default">Critical Hits</button>
    </form>
</div>