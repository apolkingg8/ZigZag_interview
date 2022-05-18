Description:

We have to pay attention to ventilation during the COVID19. 
We have an offline event venue and we have divided the venue into several spaces(rooms) and we will identify the largest unventilated space to be used as a warehouse, not as a showroom.
I use a one-dimensional string type array grid to represent the map of venue. 
The array grid contains only 6 characters A/B/C/D/E/O
Each character on the map represents an one square meter area, where "O" represents the corridor and the other characters represent the space.
Identical and consecutive (consecutive means connected in four directions: up, down, left and right) characters form the same space.
Suppose the entire grid area is surrounded by corridors. What is the maximum area of the space that is not directly adjacent to the corridor? If there is no such space, please return 0.

[example](https://docs.google.com/spreadsheets/d/1objQYJZhXfOCv0N43HvE4jaEG_vdNwLEuUMVOQtsDUI/edit?usp=sharing)

Sample 1:
```
input:
grid = ["BBO","ACB","AAB"]
output:
1
explanation: Of the 4 spaces, only 1 is not adjacent to the corridor and its area is 1㎡
```

Sample 2:
```
input:
grid = ["BBBBBBOOOOO","ABADCBOBBBB","ABAADBOBAAB","BBBBBBOBBBB"]
output:
3
explanation: Of the 8 spaces, 5 are not adjacent to the corridor, with areas of 3㎡, 1㎡, 1㎡, 1㎡, 2㎡, and the maximum area is 3㎡
```

