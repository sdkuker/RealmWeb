Change log

Version 2023-B (deployed 5/5/23)
1) Added the total defensive bonus to the character detail view so people could see it as they're adding
their individual items - a suggestion from Dan.

Version 2023-A
1)  Added the ability to have multiple instances of the same character in combat - i.e. if you had an NPC
(or any character) on the character list, when you include that character when creating the combat encounter,
you can now specify how many instances of the character should be in the combat.  Normally this will be
for NPCs - so Mark could have 1,000 instances of a character in the combat encounter.  When the combat 
starts, the combat view will show the original number of instances and calculate the number remaining based
on the damage done.  
2) Will contests were changed to allow constests against yourself.  
3) This isn't a change, but Mark wanted to see if we could increase the overall font size.  I showed him
how to increase/decrease the font size in Safari by using option/command/+ and option/command/-
4) Added an 'Attacker' drop down to the Critical Hits view that appears when in combat mode.  Mark can 
specify who the attacker was - and it will appear in the description.  This is really just for documentation
for him - it has no other impact.
5) Fixed a bug where the descriptions for combat encounters in the critical hits view was sometimes showing
%20 etc in the description.  That's 'cause I wasn't using the encounters getDescrption() function which description
which has decoding in it - to take out that stuff.  
6) Fixed a bug in critical hits for combat where it also had %20 in some of the descriptions.  Added a field in the
view that would decode the combat critical hit description and used that in the template.
7) Added descriptions for the quickness bonus, racial modifier, and adrenal defense character attributes.
8) Added several character defense attributes and descriptions.  The are: bracersBonus, ringBonus, magicalItemBonus,
martialProwessBonus, terrainAwarenessBonus, zenMasterBonus, calisthenicsBonus.  These were all included in the characters
defensive calculations like total defense, etc.
9) Added the 'must parry' column in combat.  It's just a number that doesn't factor into any calcuation or
carry over to the next round.  Every round starts at zero regardless of the value from the previous round.
10) Added the Stevieware Navigation Brand 'about' view and put a version number in there.  I have to manually
update the version in the about.js file whenever a new version of the app gets deployed.