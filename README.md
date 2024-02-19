# Capstone 2 Front-End App
This is the front-end application for my 2nd capstone project for the Springboard Software Engineering Bootcamp. This allows users to create characters for Dungeons & Dragons. The back-end server repository can be found [here](https://github.com/alocke8181/capstone2-server). The goal of this project is to demonstrate everything I've learned in the second half of this course.

The entire front-end is made with React. The website allows users to register an account and create characters for D&D. The bulk of the work has been spent on the character sheets. Users first fill out a small form to create a new character, and then that starting data is sent to the server. The server saves the starting data, and then builds a character object to send back to the app. Many parts of the character use data pulled from [this external API](https://www.dnd5eapi.co/). Users can then edit their character sheets and save them to the server.

The website is live [here](https://the-starting-tavern.onrender.com/). If it seems to be taking a long time to load it's because Render.com spins down free web pages and servers. So give it time to spin the app and server back up.

## User Flow
When a user connects they are first brought to the home page. This is a brief explanation of the website and its features. The header menu allows users to log in to an existing account, or register to create a new one.

### User Pages
When a user registers, their information is sent to the server. Passwords are encrypted with Bcrypt. After registering or logging in, the server returns a `user` object and a JSON Web Token of the `user` object. Both of these are saved to `localstorage`. This allows the user to be able to leave the website and come back without having to log in again. The `user` is saved in a `UserContext` to allow easy access from any component. Users are then redirected to their profile page.

From the profile page, users can see their account information, as well as a list of any characters they've made. Each character is only shown as a brief description with their name, level, race, and class. User's can click on a character to be taken to the character sheet. They can also create a new character, edit their account, or delete their account from this page. If they wish, they may change their password or their email. A user is only able to view another user's page if they are an administrator, otherwise they will be redirected to a `403 Forbidden` page. This will also happen if they try to view a character they don't own.


### Character Sheets
When creating a character, a few key pieces of information are needed. Characters must have a Name, Class, Race, and Level. This is because the server uses these properties to query the external API to fill in information. A character's Proficiency Bonus, for example, is determined by both the character's Class and their Level. After completing the form, they are redirected to the new character's sheet.

The character sheet makes up the bulk of the website and is where user's will spend most of their time. To someone who has never played D&D, the amount of information can be overwhelming, but there is a method to the madness. 

#### Core Stats
The first row is the core information about the character: Name, Race, Class, Background, Level, and Experience Points. Next are the six core stats of D&D: Strength, Dexterity, Constitution, Intelligence, Wisdom, and Charisma. These stats range between 0 and 20 (but can sometimes be higher) and their modifier values ((stat-10)/2 rounded down) are used throughout the sheet.

#### Combat Stats
The next row is the combat stats: all the important numbers used during fights. AC, or Armor Class, is a measure of the character's armor. When they are attacked, the enemy has to make a roll. If the result is higher than the player's AC, the player gets hit. Likewise, players have to roll against enemy's AC to hit. Initiative is a way of determining turn order. All enemies and players roll a 20-sided die (D20) and add their Initiative to it. Higher rolls go first. Speed is how far the player can move in one turn, measured in feet. Each tile on a D&D gameboard is 5x5 feet. So a character with 30 Speed can move 6 tiles on their turn. Hit Points is how much health a character has. If their health goes to 0, they are downed and must begin making Death Saving Throws. Temporary HP is any hit points granted by bonuses or spells. Unlike normal HP, these cannot be restored, and are depleted before HP begins getting reduced. Hit Dice are how the player restores health during Short Rests. The player may expend as many Hit Dice as they have available and add their Constitution Modifier to the result. The type of dice and how many they have available are determined by their class and level. Death Saves are used when the player is downed. On their turn, they roll a D20 and if the result is greater than 10, they succeed. Otherwise they fail. If they succeed 3 times, they are stable and remain unconscious. If they fail 3 times, they are dead.

#### Skills & Proficiencies
Below these are the character Skills and Proficiencies. The Saving Throws and Skills all use a corresponding core stat modifier. When a player wants to make a Skill Check or Saving Throw, they roll a D20 and add the corresponding modifier to the result. For example, if a character wanted to make an Acrobatics skill check, they would roll a D20 and then add their Dexterity modifier to the result. If a Skill or Saving Throw is checked, that means they are proficient with that and can add their Proficiency Bonus to the roll. The Proficiency Bonus is determined by the character's class and level. Languages are simply any language the character can speak and understand fluently. Equipment Proficiencies mean the player can add their Proficiency Bonus to any rolls involving a listed equipment or type. Passive Perception is how easily the character can notice things about their environment that might not be obvious. Inspiration is a point system that players can use to re-roll dice at any time.

#### Alt Resources, Equipment, & Money
The next row is alternate resources, equipment, and money. An Alternate Resource could be something like Bardic Inspiration (allows players to add a D6 to any skill checks). Basically, any resource the player needs to track that isn't an equipment item or spell slot. Equipment is simple: any items the character has and their quantity. Users can easily add or delete equipment from their inventory. The Money is how many Copper, Silver, and Gold pieces the character has. 1 Gold = 10 Silver = 100 Copper.

#### Physical Attacks
The next row are any physical attacks that the character can do. These usually involve any weapons the player has in their equipment. **This section does not include spells!** Those are further down the page. Attacks can have four main properties: their attack roll, their damage, their alternate damage, and a saving throw. The attack roll is what the player does to determine if they hit their target. They roll a D20, add the corresponding stat modifier, their Proficiency Bonus (if they are proficient with the weapon), and any additional bonuses/penalties that may be included (a magic sword could have an additional +1 to the attack roll). If the attack hits, the player then rolls for damage. They roll a number of a specified die (D4, D6, D8, D10, or D12), and add their stat modifier and any additional bonuses/penalties. Some weapons can also deal an alternative damage. For example, a flaming sword could deal 1D6 Slashing damage and an additional 1D4 Fire damage. Some attacks can also require the target to make a Saving Throw. The target rolls a D20 and adds their corresponding stat modifier. If they succeed, then a specified effect happens. For example, the flaming sword may require the target to make a Dexterity Saving Throw and if they succeed, they don't take the additional fire damage. The character sheet is automatically saved when adding, editing, or deleting an attack.

#### Traits & Features
The next two sections are Racial Traits and Class Features. These primarily come from the character's Race and Class, but some can also be given as results from gameplay decisions. Because of this, users have two options when adding traits/features. They can choose from standard ones that are sourced from the external API, or they can create a custom one. Custom Traits/Features are saved on the database and retrieved when the character is being send out. The character is automatically saved when a Trait/Feature is added, edited, or deleted.

#### Spells
The next large section is for spells. In D&D, spells are broken up by their level. The higher level the spell, the more powerful it is. Cantrips are the lowest level. These are simple spells that the player can cast at any point and any amount of times. Classes that depend on spells will have Spell Slots for every level. Spell Slots represent how many times a player can cast a spell of that level until they need to long rest. As the character levels up, the number of Spell Slots at each level will increase. When casting a spell, players will use their Spellcasting Ability. This is determined by their class. The Spellcasting Modifier and Spell Save DC use the modifier from their ability. The Spellcasting Modifier is the number that is added when casting certain spells to determine if they hit their target. The Spell Save DC represents the number that must be exceeded when a target has to make a Saving Throw. Only some spells require the target to make a Saving Throw, and they will specify what type of throw must be done.

#### Bio
The final section is the Character Bio. This is where players can describe their character. What they look like, what their backstory is, their personality and morals, and any allies or associations they may have. This is also where they put the character's age, height, and weight.

At the bottom of the page, users can delete their character.

#### Dice Rolling
While half of game-play of D&D is roleplaying, the other half is rolling dice. Players roll 4, 6, 8, 10, 12, or 20-sided dice (abbreviated to D4, D6, D8, D10, D12, or D20) to make attacks, perform skill checks, calculate damage, any many more actions. To make this easier, the Character Sheet is able to automatically perform certain rolls. Players can click on a Saving Throw, Skill, Attack Name, or Spell Name and the application will roll and add corresponding bonuses to the result. This will be shown in the sidebar of the sheet. The larger number is the result, and the smaller one is only the dice roll. 

If the player is making an Attack Roll for a Physical Attack or Spell. They can click on the result to also roll for the damage. If the attack roll is a Critical Hit (when the die roll is a 20), the damage will be adjusted by rolling twice as many damage dice. Critical Hits will be highlighted in green, while Critical Fails (rolling a 1) will be in red. Certain Spells do not require an Attack Roll to deal damage. In this case, only the damage will be rolled and shown.