Change log

Version 2023-G (deployed 07/XX/23)
1) Added the player associated with the characters on the combat round view.  Also grouped
the characters for each player together by changing the comparator on the collection.  Added the sort by
initiative and sort by player-initiative feature on the character list view. Addded tooltip descriptions
for the 'open' and 'update' buttons on the combat encounter list view.  Also, disabled the 'open' button for
combat encounters that have already been opened.  They're considered open if they have any rounds in them at all.
Also added the confirmational modal dialog and used it to display when someone tries to open a combat encounter that
for the first time.  It'll describe what happens when you open an encounter and give them the chance to confirm or
cancel it. Fixed a display issue in the combat screen where the number of instances remaining would display NaN if
some of the values were zero.  

Version 2023-F (deployed 06/05/23)
1) Rounded the total defensive bonus value to the nearest integer.  

Version 2023-E (deployed 06/01/23)
1) Changed the defensive bonus mulitplier so you could have a non-integer (i.e. 4.5) value.

Version 2023-D (deployed 05/31/23)
1)  Changed several lables for character attributes.  Shield Choice was changed to Shield Bonus.  The skill bonuses were
changed so they no longer had the numbers (1,2,3) and now include 'background' - so now all 3 of them are 'Skill or background
Bonus'.  Changed the Misc Item Choice fields so they're both just 'Misc Item Bonus'.  Changed 'Magical Items' to 'Magical Item',
just removed the plural 's'.  Added 'bonus' to 'Special Ability'.  Note these are just label changes, the names of the underlying model
fields were not changed.
2) Added an edit for Character attributes so that only one of shield, bracers, ring, and magical items bonuses can have a value > 0.  
An error message will appear if you try to enter a second one.  The message will also appear if there are too many filled in when you try
to save it.  This message will stop the changes from saving.
3) Added another Character attributes edit so that only five o martial prowess, terrain awareness, zen master, calisthenics, and the 
three skill choices can have a value > zero.  An error message will appear when you enter it and also if there are too many filled in when
you try to save it.  This message will stop the changes from saving.
4) Changed the character defensive bonus totals so there is now a subtotal, a multiplier, a new total with the multiplier, 
one with parry, one with adrenal defense and one with parry and adrenal defense.  These are on the character 
and character list views.
5) Replaced the old defensive attribute totals with the new ones in combat.  This is not backward-compatible -
old combats will no longer open (the totals are stored with each character in each round and the old encounters
will not have the new total fields).

Version 2023-C (deployed 5/09/23)
1) Added a second misc item for the characters and added a note on the characters detail view saying that you
have to save the character before the total defensive bonus will update.  Changed the behavior on 'save' of
that view to stay on that view instead of going to the characters list view - so people could see the effects
of changing attributes that make up the defensive bonus.

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