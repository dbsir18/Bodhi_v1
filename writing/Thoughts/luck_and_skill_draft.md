# Once Everyone Knows the Strategy

We had a banger day of Splendor recently. It ended in an argument instead of a winner, and the argument was still going somewhere around 3am. We were fighting about how to play. Guild play, take the nobles early. Vertical play, build the engine up through the levels. And defensive play, reserving cards just to deny people. Everyone had a theory, and everyone had a game they could point to where the theory had won.

Then somebody asked the question that ended it, and nobody could answer. Once everybody at this table knows all of these strategies, how does the game actually play out?

## Luck depends on who is sitting at the table

Luck isn't printed on the box. It depends on who sits down.

Put a newcomer against a veteran and Splendor is mostly a skill game. The veteran wins, no drama. Now put four people at the table who learned the game from the same videos and the same forum threads. The gaps between them shrink to almost nothing, but the deck is shuffled exactly as before. So the shuffle decides.

Every result on game night is two things added together. The gap, which is how much better one player is, in points per game, on average. The swing, which is how many points the cards hand out or take away in a single game, and I'm counting the other three players as part of the swing, because from where you sit they are about as predictable as the deck. Luck isn't a property of the game. It's the swing measured against the gap.

The numbers from here on are made up, and I'll flag every one. Say the cards swing a typical score by about 6 points either way. How often does the better player win?

![A line chart of how often the best player wins, by skill gap, when the cards swing a score by about 6 points. A 2-point edge wins 63 games in 100 between two players, and only 33 at a table of four.](/images/charts/win-probability-by-gap.svg)

*toy model: two players = normal curve at gap ÷ 6; four players = 600,000 simulated games per point*

The 63 isn't made up, it's the normal curve. Each game's margin is the gap plus a random swing, the swing is bell-shaped with a typical size of 6, and a gap of 2 is one third of that. A shift that small tips a fair 50-50 to about 63-37. The gap only starts to dominate when it gets as big as the swing or bigger.

The big dot is the night's whole argument. If guild play is genuinely better than vertical play, it wins 63 games out of 100. That sounds decisive. From a chair at the table it is almost invisible.

And it isn't some exotic advantage. A 100-point gap in chess ratings means the higher-rated player scores about 64% of the points, almost exactly this 2-point edge. Two decent players, slightly different levels.

## Why the argument never ends

Guild outscores vertical in 63 games out of 100, so vertical outscores guild in 37. Across a five-game night, what are the odds vertical never takes one off guild? It falls short each game with probability 0.63, so five straight falls are 0.63 × 0.63 × 0.63 × 0.63 × 0.63, about 10%. Nine nights out of ten, vertical takes at least one game off guild. That is why everyone had a game they could point to.

So how long would you have to play to settle it for real? In one game the result is the gap plus a swing of about 6, so one game tells you almost nothing about a gap of 2. Average over more games and the swings start to cancel, but slowly. The fog shrinks with the square root of the number of games, so four times the games gets you half the fog:

| Games played | Fog around the average result |
| --- | --- |
| 1 | ±6 points |
| 4 | ±3 points |
| 16 | ±1.5 points |
| 64 | ±0.75 points |

What you want is fog smaller than the gap you're trying to see. A gap of 2 starts to poke out somewhere between 16 and 64 games. To be properly sure, the kind of sure where you'd bet against being fooled, it takes about 70 games. That's a game night every week for well over a year, same players, same seats. (I like math. I'm told this is not a personality, but here we are.)

![A line chart of leading the tally versus proving the edge. Leading the tally comes fast. Proving it takes about 70 games.](/images/charts/leading-vs-proving.svg)

*toy model: 2-point edge, 6-point swing; each point is 300,000 simulated stretches of games*

The argument never ends for an arithmetic reason, and I find that oddly comforting.

Both of my guesses can move and the shape holds. Shrink the gap to 1 and you need about 280 games. Make the swing bigger and it gets worse.

I have been generous, though. I handed you the gap. At a real table you never see it, and you never see the swing either. You see only the scores they add up to. A player winning 55% of games could hold a large edge in a very swingy game or a tiny edge in a calm one, and no amount of staring at the scoreboard tells you which.

## Eight destinations, three points

A few weeks ago one of us completed eight destination tickets in Ticket to Ride and lost. Eight. Every strategy guide written about that game says destinations are the scoring engine. The other player spent his trains on the long routes instead, built the eight-length tunnel, collected longest road, and won by three points. Three.

When the story got retold, the word was "unreal", and it is the right word, because nothing about the result was fake. Two people played well, the margin landed inside the game's swing, and the scoreboard printed it as a victory for long routes. Say a typical swing in that game is 20 points (a guess again). Then about one game in eight finishes within three points either way. His three-point win wasn't a verdict. It was one spin of the wheel.

A strategy guide is a claim about averages, and one game is one draw from the average. It can't contradict the guide, and it can't confirm the long-routes theory either.

## The exam had error bars

There is a reason game night with this group is so loud, and it is not the games.

The people at that table got into colleges that take you on exam rank, in exams that lakhs of people sit. A table full of people like that learns its strategies from the same videos and the same forum threads. The gaps shrink, and the shuffle decides.

The exam that ranked us was also a measurement with a swing, one bad morning, one lucky guess. I can't rerun ours, so I ran a thought experiment on a computer instead. Take 100,000 students and give each a true ability. Let an exam measure that ability with a bit of noise, enough that two sittings broadly agree (a correlation of 0.9, which is a very good exam). The top 1% on the first sitting is 1,000 students. Have everyone sit it again, and only about 540 of those 1,000 are still in the top 1%. Nearly half are gone.

![A bar chart of retake survival. Of the 1,000 students in the top 1% on one sitting, how many are still there on a second sitting.](/images/charts/exam-retake-survival.svg)

*thought experiment: 100,000 simulated students, 2,000,000 runs per reliability; ability is a bell curve*

The second question was meaner. Pick any two students from that first top 1,000 and ask who is truly more able. The one who ranked higher is right 71 times in 100. A coin is right 50. If the exam is noisier (a correlation of 0.7), only about 270 survive the retake, and the higher-ranked student is right 63 times in 100.

The very top is where it gets ugly. Among 100,000 students, with that same very good exam, the student ranked first is the truly most able one only about 37% of the time. They are almost certainly among the best ten (88%). But the exam's top 100 contains only about 58 of the real top 100.

Think of ranking sprinters who all run between 10.1 and 10.2 seconds by a single race. The race tells you they are all fast. It tells you very little about who is fastest. It is the same arithmetic as the board game, select hard on a noisy filter and the gap inside the group is small, while the swing is not.

Two things keep this honest. The exam still works on average, the top 1% really is far more able than the median, and what's noisy is the ordering among people already selected. And I don't know the real reliability of any actual exam, which is why I tried two.

None of this makes the exam useless. It finds the right neighbourhood. What it cannot do is number the houses, and every cutoff, every topper headline and every shortlist reads the rank all the way down to the house number.

## Once everybody knows

I don't have a closing answer for the question that ended the night, and I have stopped wanting one. Once everybody knows the strategy, the game plays out loud and more or less on the draw. That is a fine way to spend a Sunday. Next week the deck gets shuffled again, the scoreboard resets, and nobody carries a ranking out of the room.

The morning that ranked us was never shuffled again. It ran once, and the number it produced was read for years as if it were a measurement. When a table of players this alike lets the shuffle crown a winner, we laugh. When a filter does the same thing, we call it merit.

The only difference is that one of them lets you play again.
