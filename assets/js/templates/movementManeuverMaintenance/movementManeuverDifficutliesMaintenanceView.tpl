<div class="container">
    <div class="page-header">
        <h2>Difficulties Maintenance</h2>
    </div>
    <form class="form-horizontal">
        <div class="form-group">
            <label class="control-label col-md-2">Difficulties:</label>
            <div class="col-md-2">
                <select id='difficultySelect' class="form-control">
             </select>
            </div>
            <label class="control-label col-md-1">Level:</label>
            <input class="col-md-1" type="number" min="1" id="difficultyLevel">
            <button class="btn btn-default col-md-1 col-md-offset-1" id='updateDifficultyButton' type='button'>Update</button>
            <button class="btn btn-default col-md-1 col-md-offset-1" id='deleteDifficultyButton' type='button'>Delete</button>
            <button class="btn btn-default col-md-1 col-md-offset-1" id='verifyLevelButton' type='button'>Verify</button>
        </div>
    </form>
    <form class="form-horizontal">
        <div class="form-group">
            <label class="control-label col-md-2">New Difficulty:</label>
            <input class="col-md-2" type="string" id="newDifficulty">
            <label class="control-label col-md-1">Level:</label>
            <input class="col-md-1" type="number" min="1" id="newDifficultyLevel">
            <button class="btn btn-default col-md-1 col-md-offset-1" id='addDifficultyButton' type='button'>Add</button>
            <label class="col-md-1"> </label>
        </div>
    </form>
</div>