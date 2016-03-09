<div class="container">
    <div class="page-header">
        <h1>Character</h1>
    </div>
    <div class="container">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h2 class="panel-title">Base Attributes</h2>
            </div>
            <div class="panel-body">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="name">Name:</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="name" value="<%- name %> ">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="playerName">Player:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="playerName" value="<%- name %> ">
                        </div>
                        <label class='control-label col-sm-2' for="initiative">Initiative:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="initiative" value="<%- initiative %> ">
                        </div>
                        <label class='control-label col-sm-2' for="initiativeModifier">Initiative Modifier:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="initiativeModifier" value="<%- initiativeModifier %> ">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="hitPoints">Hit Points:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="hitPoints" value="<%- hitPoints %> ">
                        </div>
                        <label class='control-label col-sm-2' for="hitPointsModifier">Hit Point Modifier:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="hitPointsModifier" value="<%- hitPointsModifier %> ">
                        </div>
                        <label class='control-label col-sm-2' for="level">Level:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="level" value="<%- level %> ">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class='control-label col-sm-2' for="will">Will:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="will" value="<%- will %> ">
                        </div>
                        <label class='control-label col-sm-2' for="willModifier">Will Modifier:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="willModifier" value="<%- willModifier %> ">
                        </div>
                        <label class='control-label col-sm-2' for="miscItemChoice">Misc Item:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="miscItemChoice" value="<%- miscItemChoice %> ">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <form>
        <div>
            <button id='saveButton' type='button' class="btn btn-default">Save</button>
            <button id='deleteButton' type='button' class="btn btn-default">Delete</button>
        </div>
    </form>
</div>