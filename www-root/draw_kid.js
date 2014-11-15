
		var sphgeometry = new THREE.SphereGeometry( 20, 32, 32 );
		var sphmaterial = new THREE.MeshLambertMaterial( {color: 0xffff00} );
		var sphere = new THREE.Mesh( sphgeometry, sphmaterial );
		sphere.position.x = 400;
		sphere.position.y = 100;
		scene.add( sphere );


		var neckgeometry = new THREE.CylinderGeometry(8, 10, 15);
		var neckmaterial = new THREE.MeshBasicMaterial({color: 0x00EE00});
		var neck = new THREE.Mesh(neckgeometry, neckmaterial);
		neck.position.x = sphere.position.x;
		neck.position.y = sphere.position.y - 26;
		scene.add(neck);

		var bodygeometry = new THREE.CylinderGeometry(5, 5, 60);
		var bodymaterial = new THREE.MeshBasicMaterial({color:0x8B0000});
		var boy_body = new THREE.Mesh(bodygeometry, bodymaterial);
		boy_body.position.x = neck.position.x;
		boy_body.position.y = neck.position.y - 32;
		scene.add(boy_body);

		var left_major_armgeometry = new THREE.CylinderGeometry(3, 4, 40);
		var left_major_armmaterial = new THREE.MeshBasicMaterial({color: 0xEEEE00});
		var left_major_arm = new THREE.Mesh(left_major_armgeometry, left_major_armmaterial);
		left_major_arm.rotation.z = -Math.PI /4;
		left_major_arm.position.x = boy_body.position.x+Math.sin(left_major_arm.rotation.z)*20;
		left_major_arm.position.y = boy_body.position.y-Math.cos(left_major_arm.rotation.z)*20+25;
		scene.add(left_major_arm);

		var left_minor_armgeometry = new THREE.CylinderGeometry(3, 4, 40);
		var left_minor_armmaterial = new THREE.MeshBasicMaterial({color: 0xEEEE00});
		var  left_minor_arm = new THREE.Mesh( left_minor_armgeometry, left_minor_armmaterial);
		left_minor_arm.rotation.z = Math.PI /4;
		left_minor_arm.position.x = left_major_arm.position.x-20*Math.sin(left_major_arm.rotation.z) - 20*Math.sin(left_minor_arm.rotation.z);
		left_minor_arm.position.y = left_major_arm.position.y-20*Math.cos(left_major_arm.position.z) + 20*Math.cos(left_minor_arm.rotation.z);
		scene.add( left_minor_arm);
		

		var left_boy_handgeometry = new THREE.SphereGeometry(10, 20, 20);
		var left_boy_handmaterial = new THREE.MeshBasicMaterial({color: 0x2D882D});
		var left_boy_hand = new THREE.Mesh(left_boy_handgeometry, left_boy_handmaterial);
		left_boy_hand.position.x = left_minor_arm.position.x - 20 * Math.sin(left_minor_arm.rotation.z);
		left_boy_hand.position.y = left_minor_arm.position.y + 20 * Math.cos(left_minor_arm.rotation.z);
		scene.add(left_boy_hand);

		var right_major_armgeometry = new THREE.CylinderGeometry(3, 4, 40);
		var right_major_armmaterial = new THREE.MeshBasicMaterial({color: 0xEEEE00});
		var right_major_arm = new THREE.Mesh(right_major_armgeometry, right_major_armmaterial);
		right_major_arm.rotation.z = Math.PI /4;
		right_major_arm.position.x = boy_body.position.x+Math.sin(right_major_arm.rotation.z)*20;
		right_major_arm.position.y = boy_body.position.y-Math.cos(right_major_arm.rotation.z)*20+25;
		scene.add(right_major_arm);

		var right_minor_armgeometry = new THREE.CylinderGeometry(3, 4, 40);
		var right_minor_armmaterial = new THREE.MeshBasicMaterial({color: 0xEEEE00});
		var  right_minor_arm = new THREE.Mesh( right_minor_armgeometry, right_minor_armmaterial);
		right_minor_arm.rotation.z = -Math.PI /4;
		right_minor_arm.position.x = right_major_arm.position.x+20*Math.sin(right_major_arm.rotation.z) - 20*Math.sin(right_minor_arm.rotation.z);
		right_minor_arm.position.y = right_major_arm.position.y-20*Math.cos(right_major_arm.rotation.z) + 20*Math.cos(right_minor_arm.rotation.z);
		scene.add( right_minor_arm);
		

		var right_boy_handgeometry = new THREE.SphereGeometry(10, 20, 20);
		var right_boy_handmaterial = new THREE.MeshBasicMaterial({color: 0x2D882D});
		var right_boy_hand = new THREE.Mesh(right_boy_handgeometry, right_boy_handmaterial);
		right_boy_hand.position.x = right_minor_arm.position.x - 20 * Math.sin(right_minor_arm.rotation.z);
		right_boy_hand.position.y = right_minor_arm.position.y + 20 * Math.cos(right_minor_arm.rotation.z);
		scene.add(right_boy_hand);

		var left_leggeometry = new THREE.CylinderGeometry(3, 4, 44);
		var left_legmaterial = new THREE.MeshBasicMaterial({color: 0xEEEE00});
		var left_leg = new THREE.Mesh(left_leggeometry, left_legmaterial);
		left_leg.rotation.z = -Math.PI /6;
		left_leg.position.x = boy_body.position.x-15;
		left_leg.position.y = boy_body.position.y-32;
		scene.add(left_leg);

		var right_leggeometry = new THREE.CylinderGeometry(3, 4, 40);
		var right_legmaterial = new THREE.MeshBasicMaterial({color: 0xEEEE00});
		var right_leg = new THREE.Mesh(right_leggeometry, right_legmaterial);
		right_leg.rotation.z = Math.PI /6;
		right_leg.position.x = boy_body.position.x+10;
		right_leg.position.y = boy_body.position.y-30;
		scene.add(right_leg);



		var left_footgeometry = new THREE.CylinderGeometry(3, 4, 40);
		var left_footmaterial = new THREE.MeshBasicMaterial({color: 0xEEEE00});
		var left_foot = new THREE.Mesh(left_footgeometry, left_footmaterial);
		left_foot.position.x = left_leg.position.x+ 20*Math.sin(left_leg.rotation.z);
		left_foot.position.y = left_leg.position.y - 20*Math.cos(left_leg.rotation.z) - 20;
		scene.add(left_foot)

		var right_footgeometry = new THREE.CylinderGeometry(3, 4, 40);
		var right_footmaterial = new THREE.MeshBasicMaterial({color: 0xEEEE00});
		var right_foot = new THREE.Mesh(right_footgeometry, right_footmaterial);
		right_foot.position.x = right_leg.position.x+ 20*Math.sin(right_leg.rotation.z);
		right_foot.position.y = right_leg.position.y - 20*Math.cos(right_leg.rotation.z) - 20;
		scene.add(right_foot)

		var left_leg_active = 0;
		var left_arm_active = 0;
		var right_arm_active = 0;
		var right_leg_active = 0;

		$(document).on('handTap'), function (event , coordinate, finger)
		{
			if (finger==0)
			{
				left_leg_active += 1
			}
			else if (finger==1)
			{
				left_arm_active += 1 
			}
			else if (finger==2)
			{
				right_arm_active += 1 
			}
			else if (finger==3)
			{
				right_leg_active += 1
			}
		}

    		function drop_rotation(active_id);
    		{
			var left_leg_overhigh = false;
			var right_leg_overhigh = false;
			var left_arm_overhigh = false;
			var right_arm_overhigh = false;



    			window.requestAnimationFrame(drop_rotation);
			render.render(scene, camera);
			//boy
			sphere.rotation.y += 0.1;
			neck.rotation.y -= 0.05;
			boy_body.rotation.y -= 0.03;

			/******
			arm start
			******/
			if (left_arm_active>0)
			{
				if (left_arm_overhigh==false)
				{
					if ((left_major_arm.rotation.z >(-Math.PI/2))&&(left_major_arm.rotation.z<=(-Math.PI*1/4)))
					{
						left_major_arm.rotation.z -= 0.05
						left_minor_arm.rotation.z -= 0.05
						if (left_major_arm.rotation.z <(-Math.PI/2))
						{
							left_major_arm.rotation.z = -Math.PI/2;
							left_minor_arm.rotation.z = 0;
						}

						left_boy_hand.position.x = left_minor_arm.position.x - 20 * Math.sin(left_minor_arm.rotation.z);
						left_boy_hand.position.y = left_minor_arm.position.y + 20 * Math.cos(left_minor_arm.rotation.z);
						left_major_arm.position.x = boy_body.position.x+Math.sin(left_major_arm.rotation.z)*20;
						left_major_arm.position.y = boy_body.position.y-Math.cos(left_major_arm.rotation.z)*20+25;
						left_minor_arm.position.x = left_major_arm.position.x+20*Math.sin(left_major_arm.rotation.z) - 20*Math.sin(left_minor_arm.rotation.z);
		 				left_minor_arm.position.y = left_major_arm.position.y-20*Math.cos(left_major_arm.rotation.z) + 20*Math.cos(left_minor_arm.rotation.z);
					}
					else if (left_major_arm.rotation.z<=(-Math.PI*3/4))
					{
						left_arm_overhigh = true;
					}
					else 
					{
						left_major_arm.rotation.z -= 0.05
						if (left_major_arm.rotation.z <(-Math.PI*3/4))
						{
							left_major_arm.rotation.z = -Math.PI*3/4;
							left_minor_arm.rotation.z = 0;
						}
						left_boy_hand.position.x = left_minor_arm.position.x - 20 * Math.sin(left_minor_arm.rotation.z);
						left_boy_hand.position.y = left_minor_arm.position.y + 20 * Math.cos(left_minor_arm.rotation.z);
						left_major_arm.position.x = boy_body.position.x+Math.sin(left_major_arm.rotation.z)*20;
						left_major_arm.position.y = boy_body.position.y-Math.cos(left_major_arm.rotation.z)*20+25;
						left_minor_arm.position.x = left_major_arm.position.x+20*Math.sin(left_major_arm.rotation.z)
						left_minor_arm.position.y = left_major_arm.position.y-20*Math.cos(left_major_arm.rotation.z)+20

					}
				}
				else
				{
					if ((left_major_arm.rotation.z>=(-Math.PI/2))&&(left_major_arm.rotation.z<(-Math.PI/4)))
					{
						left_major_arm.rotation.z += 0.05
						left_minor_arm.rotation.z += 0.05
						if (left_major_arm.rotation.z >(-Math.PI/4))
						{
							left_major_arm.rotation.z = -Math.PI/4
							left_minor_arm.rotation.z = Math.PI/4
						}
						left_boy_hand.position.x = left_minor_arm.position.x - 20 * Math.sin(left_minor_arm.rotation.z);
						left_boy_hand.position.y = left_minor_arm.position.y + 20 * Math.cos(left_minor_arm.rotation.z);
						left_major_arm.position.x = boy_body.position.x+Math.sin(left_major_arm.rotation.z)*20;
						left_major_arm.position.y = boy_body.position.y-Math.cos(left_major_arm.rotation.z)*20+25;
						left_minor_arm.position.x = left_major_arm.position.x+20*Math.sin(left_major_arm.rotation.z) - 20*Math.sin(left_minor_arm.rotation.z);
			 			left_minor_arm.position.y = left_major_arm.position.y-20*Math.cos(left_major_arm.rotation.z) + 20*Math.cos(left_minor_arm.rotation.z);
					}
					else if(left_major_arm.rotation.z>=(-Math.PI/4))
					{
						left_arm_overhigh = false;
						left_arm_active -= 1;
					}
					else
					{
						left_major_arm.rotation.z += 0.05
						if (left_major_arm.rotation.z>(-Math.PI/2))
						{
							left_major_arm.rotation.z = -Math.PI/2
							left_minor_arm.rotation.z = 0
						}
						left_boy_hand.position.x = left_minor_arm.position.x - 20 * Math.sin(left_minor_arm.rotation.z);
						left_boy_hand.position.y = left_minor_arm.position.y + 20 * Math.cos(left_minor_arm.rotation.z);
						left_major_arm.position.x = boy_body.position.x+Math.sin(left_major_arm.rotation.z)*20;
						left_major_arm.position.y = boy_body.position.y-Math.cos(left_major_arm.rotation.z)*20+25;
						left_minor_arm.position.x = left_major_arm.position.x+20*Math.sin(left_major_arm.rotation.z)
						left_minor_arm.position.y = left_major_arm.position.y-20*Math.cos(left_major_arm.rotation.z)+20
					}
				}
			}

			//right hand
			if (right_arm_active>0)
			{
				if (right_arm_overhigh==false)
				{
					if ((right_major_arm.rotation.z <(Math.PI/2))&&(right_major_arm.rotation.z>=(Math.PI*1/4)))
					{
						right_major_arm.rotation.z += 0.05
						right_minor_arm.rotation.z += 0.05
						if (right_major_arm.rotation.z >(Math.PI/2))
						{
							right_major_arm.rotation.z = Math.PI/2;
							right_minor_arm.rotation.z = 0;
						}

						right_boy_hand.position.x = right_minor_arm.position.x - 20 * Math.sin(right_minor_arm.rotation.z);
						right_boy_hand.position.y = right_minor_arm.position.y + 20 * Math.cos(right_minor_arm.rotation.z);
						right_major_arm.position.x = boy_body.position.x+Math.sin(right_major_arm.rotation.z)*20;
						right_major_arm.position.y = boy_body.position.y-Math.cos(right_major_arm.rotation.z)*20+25;
						right_minor_arm.position.x = right_major_arm.position.x+20*Math.sin(right_major_arm.rotation.z) - 20*Math.sin(right_minor_arm.rotation.z);
						right_minor_arm.position.y = right_major_arm.position.y-20*Math.cos(right_major_arm.rotation.z) + 20*Math.cos(right_minor_arm.rotation.z);
					}
					else if (right_major_arm.rotation.z>=(Math.PI*3/4))
					{
						right_arm_overhigh = true;
					}
					else 
					{
						right_major_arm.rotation.z += 0.05
						if (right_major_arm.rotation.z >(Math.PI*3/4))
						{
							right_major_arm.rotation.z = Math.PI*3/4;
							right_minor_arm.rotation.z = 0;
						}
						right_boy_hand.position.x = right_minor_arm.position.x - 20 * Math.sin(right_minor_arm.rotation.z);
						right_boy_hand.position.y = right_minor_arm.position.y + 20 * Math.cos(right_minor_arm.rotation.z);
						right_major_arm.position.x = boy_body.position.x+Math.sin(right_major_arm.rotation.z)*20;
						right_major_arm.position.y = boy_body.position.y-Math.cos(right_major_arm.rotation.z)*20+25;
						right_minor_arm.position.x = right_major_arm.position.x+20*Math.sin(right_major_arm.rotation.z)
						right_minor_arm.position.y = right_major_arm.position.y-20*Math.cos(right_major_arm.rotation.z)+20

					}
				}
				else
				{
					if ((right_major_arm.rotation.z<=(Math.PI/2))&&(right_major_arm.rotation.z>(Math.PI/4)))
					{
						right_major_arm.rotation.z -= 0.05
						right_minor_arm.rotation.z -= 0.05
						if (right_major_arm.rotation.z <(Math.PI/4))
						{
							right_major_arm.rotation.z = Math.PI/4
							right_minor_arm.rotation.z = -Math.PI/4
						}
						right_boy_hand.position.x = right_minor_arm.position.x - 20 * Math.sin(right_minor_arm.rotation.z);
						right_boy_hand.position.y = right_minor_arm.position.y + 20 * Math.cos(right_minor_arm.rotation.z);
						right_major_arm.position.x = boy_body.position.x+Math.sin(right_major_arm.rotation.z)*20;
						right_major_arm.position.y = boy_body.position.y-Math.cos(right_major_arm.rotation.z)*20+25;
						right_minor_arm.position.x = right_major_arm.position.x+20*Math.sin(right_major_arm.rotation.z) - 20*Math.sin(right_minor_arm.rotation.z);
						right_minor_arm.position.y = right_major_arm.position.y-20*Math.cos(right_major_arm.rotation.z) + 20*Math.cos(right_minor_arm.rotation.z);
					}
					else if(right_major_arm.rotation.z<=(Math.PI/4))
					{
						right_arm_overhigh = false;
					}
					else
					{
						right_major_arm.rotation.z -= 0.05
						if (right_major_arm.rotation.z<(Math.PI/2))
						{
							right_major_arm.rotation.z = Math.PI/2
							right_minor_arm.rotation.z = 0
						}
						right_boy_hand.position.x = right_minor_arm.position.x - 20 * Math.sin(right_minor_arm.rotation.z);
						right_boy_hand.position.y = right_minor_arm.position.y + 20 * Math.cos(right_minor_arm.rotation.z);
						right_major_arm.position.x = boy_body.position.x+Math.sin(right_major_arm.rotation.z)*20;
						right_major_arm.position.y = boy_body.position.y-Math.cos(right_major_arm.rotation.z)*20+25;
						right_minor_arm.position.x = right_major_arm.position.x+20*Math.sin(right_major_arm.rotation.z)
						right_minor_arm.position.y = right_major_arm.position.y-20*Math.cos(right_major_arm.rotation.z)+20
					}
				}
			}
			/******
			arm end
			******/

			/******
			leg start
			*******/
			if (left_leg_active>0)
			{
				if  (left_leg_overhigh==false)
				{
					left_leg.rotation.z -=Math.random()/5;;
				}
				else
				{
					left_leg.rotation.z += Math.random()/4;
				}

				left_leg.position.x  = boy_body.position.x + 20*Math.sin(left_leg.rotation.z);
				left_leg.position.y  = boy_body.position.y - 20*Math.cos(left_leg.rotation.z) - 25;
				left_foot.position.x = left_leg.position.x+ 20*Math.sin(left_leg.rotation.z);
				left_foot.position.y = left_leg.position.y - 20*Math.cos(left_leg.rotation.z) - 20;
			

				if (left_leg.rotation.z<-Math.PI/2)
				{
					left_leg_overhigh = true;
				}
				if (left_leg.rotation.z>-Math.PI/6)
				{
					left_leg_overhigh = false;
				}
			}
			if (right_leg_active>0)
			{
				if  (right_leg_overhigh==false)
				{
					right_leg.rotation.z +=Math.random()/5;
				}
				else
				{
					right_leg.rotation.z -= Math.random()/4;
				}
				right_leg.position.x  = boy_body.position.x + 20*Math.sin(right_leg.rotation.z);
				right_leg.position.y  = boy_body.position.y - 20*Math.cos(right_leg.rotation.z) - 25;
				right_foot.position.x = right_leg.position.x+ 20*Math.sin(right_leg.rotation.z);
				right_foot.position.y = right_leg.position.y - 20*Math.cos(right_leg.rotation.z) - 20;
				

				if (right_leg.rotation.z>Math.PI/2)
				{
					right_leg_overhigh = true;
				}
				if (right_leg.rotation.z<Math.PI/6)
				{
					right_leg_overhigh = false;
				}
			}
			/**************
			leg part end
			**************/

			//endboy
			for  (var j=0;j<5;j++)
			{
				drop_cube[j].rotation.x += 0.1;
				drop_cube[j].position.y -=1
			}
		}
		drop_rotation();