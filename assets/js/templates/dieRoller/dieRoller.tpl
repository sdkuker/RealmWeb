<div class="container">
    <div class="page-header">
        <h1>Die Roller</h1>
    </div>
    <div>
        <form class="form-inline" role="form">
            <div class="form-group">
                <label for="nbrOfDice">Number of dice:</label>
                <select class="form-control" id="nbrOfDice">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                </select>
            </div>
        </form>
        <p></p>
    </div>
    <div class="container">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h2 class="panel-title">Type of Die</h2>
            </div>
            <div class="panel-body">
                <form class="form-inline" role="form">
                    <button id='normalButton' type='button' class="btn btn-default">Normal</button>
                    <button id='openEndedButton' type="button" class="btn btn-default">Open Ended</button>
                    <button id='openEndedDownButton' type="button" class="btn btn-default">Open Ended Down</button>
                    <button id='openEndedUpButton' type="button" class="btn btn-default">Open Ended Up</button>
                    <button id='gmConfiguredButton' type="button" class="btn btn-default">GM Configured</button>
                </form>
                <p></p>
                <form class="form-inline" role="form">
                    <div class="form-group">
                        <label for="gmConfigNbrSides">GM Configured Number of Sides:</label>
                        <select class="form-control" id="gmConfigNbrSides">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                        </select>
                    </div>
                </form>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h2 class="panel-title">Roll Results</h2>
            </div>
            <div class="panel-body">
                <p>Current Roll: <%- currentRoll %> </p>
                <p>Previous Rolls: <%- previousRolls %> </p>
            </div>
        </div>
    </div>
</div>